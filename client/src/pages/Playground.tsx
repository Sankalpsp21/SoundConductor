import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { executeIntegration } from '../redux/slices/Session';
import { AppDispatch, RootState } from '../redux/store/index';

import * as tf from '@tensorflow/tfjs';
import * as d3 from 'd3';
import { ExecuteIntegration } from '../lib/types';

const Playground = () => {
	const yamnet = useRef<any>(null);
	const custom = useRef<any>(null);
	const audioContext = useRef<any>(null);
	const [label, setLabel] = useState('Preparing model. Please wait...');
	const [confidence, setConfidence] = useState(0);
	const currentlySending = useRef<boolean>(false);

	const dispatch: AppDispatch = useDispatch();

	// const yamnetUrl = 'https://tfhub.dev/google/tfjs-model/yamnet/tfjs/1'; // Path to YAMNet model
	const yamnetUrl = '/yamnet/model.json'; // Path to YAMNet model
	const modelUrl = '/custom/model.json'; // Path to our custom model

	//const yamnetClassMap = new Map<number, string>();
	const yamnetClassMap = useRef<Map<number, string>>(
		new Map<number, string>()
	);

	const navigate = useNavigate();

	const hasUserId = useSelector((state: RootState) => state.session.user.id);
	const user = useSelector((state: RootState) => state.session.user);

	useEffect(() => {
		if (!hasUserId) {
			navigate('/auth');
			// trigger a page refresh so the useEffect on that page gets triggered
			window.location.reload();
		}
	}, []);

	useEffect(() => {
		console.log(user);

		async function wrapper() {
			async function loadSoundClassMap() {
				const map = yamnetClassMap.current;
				const csv = await d3.csv('/yamnet_class_map.csv');
				csv.forEach((row) => {
					const index = Number(row['index']);
					const displayName = row['display_name'] || 'ERROR';
					// console.log(`YAMNet class ${index} is ${displayName}`);
					map.set(index, displayName);
				});
				yamnetClassMap.current = map;
				console.log('YAMNet class map loaded');
			}

			await loadSoundClassMap();

			//console.log(yamnetClassMap.current.get(0) || 'unknown');

			async function loadYAMNetModel() {
				// yamnet.current = await tf.loadGraphModel(yamnetUrl, {
				// 	fromTFHub: true
				// });
				yamnet.current = await tf.loadGraphModel(yamnetUrl);
				console.log('YAMNet model loaded');
				setLabel('Listening ...');
			}
			loadYAMNetModel();

			async function loadCustomModel() {
				custom.current = await tf.loadGraphModel(modelUrl);
				console.log('Custom model loaded');
			}
			loadCustomModel();
		}
		wrapper();
	}, []);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: false })
			.then((stream) => {
				audioContext.current = new AudioContext();
				const mediaStreamSource =
					audioContext.current.createMediaStreamSource(stream);
				console.log('Audio stream created');
				console.log(mediaStreamSource);
				const scriptNode = audioContext.current.createScriptProcessor(
					4096,
					1,
					1
				);
				console.log('Script processor created');
				console.log(scriptNode);

				// let lastPrintTime = Date.now(); // Initialize last print time with the current time

				scriptNode.onaudioprocess = async (audioProcessingEvent) => {
					//console.log('Audio processing event');
					// Get input and output buffer
					const inputBuffer = audioProcessingEvent.inputBuffer;
					//const outputBuffer = audioProcessingEvent.outputBuffer;

					const inputData = inputBuffer.getChannelData(0);
					//const outputData = outputBuffer.getChannelData(0);

					// console.log('Input data');
					// console.log(inputData);

					// Get input sample rate
					//const sampleRate = inputBuffer.sampleRate;
					//console.log('Sample rate');
					//console.log(sampleRate);

					// Resample inputData from 44.1kHz (or 48kHz) to 16kHz
					//const resampler = new SRC(SRC.SRC_SINC_FASTEST, 1, 44100, 16000);
					//const resampledData = resampler.process(inputData);

					//const waveform = new Float32Array(inputData);

					if (yamnet.current) {
						// Make sure that the Yamnet model input shape matches the length of the waveform
						//const reshapedWaveform = tf.tensor(inputData, [1, inputData.length]);
						const reshapedWaveform = tf
							.tensor1d(inputData)
							.reshape([-1]);

						//console.log('Reshaped waveform');
						//console.log(reshapedWaveform);

						//Predict using Tensorflow.js
						//const prediction = yamnet.current.predict(reshapedWaveform);
						const [scores, _embeddings, _spectrogram] =
							yamnet.current.predict(reshapedWaveform);
						const classWithMaxScore = scores.argMax(-1); // last dimension
						const scoreData = await classWithMaxScore.data();
						const scoresData = await scores.array();
						const score = scoresData[0][scoreData];

						const strScore = `${scoreData}`;

						const parsedClass = parseInt(strScore, 10);

						const yamnetClass =
							yamnetClassMap.current.get(parsedClass) ||
							'unknown';

						const clapClasses = [56, 58, 461, 434, 461, 466, 498];

						if (score >= 0.35 && parsedClass != 494) {
							console.log(
								`YAMNet class ${parsedClass} - ${yamnetClass} (${parsedClass}) with score ${scoresData[0][parsedClass]}`
							);

							setLabel(yamnetClass);
							setConfidence(scoresData[0][parsedClass]);

							// if (
							// 	parsedClass == 498 &&
							// 	scoresData[0][parsedClass] < 0.4
							// ) {
							// 	return;
							// }

							if (
								custom.current &&
								clapClasses.includes(parsedClass)
							) {
								setLabel('Clap');

								const customPrediction =
									custom.current.predict(reshapedWaveform);
								const customClassWithMaxScore =
									customPrediction.argMax(-1); // last dimension
								const customScoreData =
									await customClassWithMaxScore.data();
								// const customScoresData = await customPrediction.array();
								// const customScore = customScoresData[0][customScoreData];

								console.log(
									`Custom class ${customScoreData} with score ${customScoreData}`
								);

								const input: ExecuteIntegration = {
									userId: user.id,
									signal: 'clap'
								};

								// const currentTime = Date.now();
								// if (currentTime - lastPrintTime >= 1500) {
								// console.log(currentTime - lastPrintTime);
								// lastPrintTime = currentTime;

								if (!currentlySending.current) {
									currentlySending.current = true;

									console.log(input);
									await dispatch(executeIntegration(input));
									currentlySending.current = false;
								}
								// }
							}
						}
					}
				};

				// Connect the audio graph
				mediaStreamSource.connect(scriptNode);
				scriptNode.connect(audioContext.current.destination);
				console.log('Audio graph connected');
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="container mx-auto">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-5xl font-bold my-16">Playground</h1>
			</div>

			<div className="flex flex-col items-center justify-center">
				<h1 className="text-5xl font-bold my-16">{label}</h1>
				<h1 className="text-5xl font-bold my-16">
					{Math.round(confidence * 100)}% Confidence
				</h1>
			</div>
		</div>
	);
};

export default Playground;
