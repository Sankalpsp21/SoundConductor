import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import * as tf from "@tensorflow/tfjs";


const Playground = () => {
  const yamnet = useRef<any>(null);
  const custom = useRef<any>(null);
  const audioContext = useRef<any>(null);
  const [label, setLabel] = useState("waiting...");
  const [confidence, setConfidence] = useState(0);
  const location = useLocation();

  //   useEffect(() => {
  //     function modelReady() {
  //       console.log("Model is now ready!");
  //     }

  //     function gotResult(error: any, results: any) {
  //       if (error) {
  //         console.error(error);
  //       }
  //       console.log(results);
  //       setLabel(results[0].label);
  //       setConfidence(results[0].confidence.toFixed(4));
  //     }

  //     if (location.pathname === "/playground") {
  //       console.log("playground");
  //       audioContext.current = new AudioContext();
  //       const options = { probabilityThreshold: 0.9 };
  //       classifier.current = ml5.soundClassifier(
  //         "SpeechCommands18w",
  //         options,
  //         modelReady
  //       );
  //       classifier.current.classify(gotResult);
  //     } else {
  //       classifier.current = null;
  //       audioContext.current = null;
  //     }

  //     return () => {
  //       if (classifier.current) {
  //         classifier.current.classify(gotResult);
  //         classifier.current = null;
  //       }

  //       if (audioContext.current) {
  //         audioContext.current.close();
  //         audioContext.current = null;
  //       }
  //     };
  //   }, [location.pathname]);

  const yamnetUrl = "https://tfhub.dev/google/tfjs-model/yamnet/tfjs/1"; // Path to YAMNet model
  const modelUrl = "/model.json";  // Path to our custom model

  useEffect(() => {
  
    async function loadYAMNetModel() {
      yamnet.current = await tf.loadGraphModel(yamnetUrl, { fromTFHub: true });
      console.log('YAMNet model loaded');
    }
    loadYAMNetModel();
  

    async function loadCustomModel() {
      //classifier.current = await tf.loadGraphModel(yamnetUrl, { fromTFHub: true });
      //console.log('YAMNet model loaded');
      custom.current = await tf.loadGraphModel(modelUrl);
      console.log('Custom model loaded');
    }
    loadCustomModel();
    
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        audioContext.current = new AudioContext();
        const mediaStreamSource = audioContext.current.createMediaStreamSource(stream);
        console.log('Audio stream created');
        console.log(mediaStreamSource);
        const scriptNode = audioContext.current.createScriptProcessor(4096, 1, 1);
        console.log('Script processor created');
        console.log(scriptNode);
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
              const reshapedWaveform = tf.tensor1d(inputData).reshape([-1]);

              //console.log('Reshaped waveform');
              //console.log(reshapedWaveform);

              //Predict using Tensorflow.js
              //const prediction = yamnet.current.predict(reshapedWaveform);
              const [scores, embeddings, spectrogram] = yamnet.current.predict(reshapedWaveform);
              const classWithMaxScore = scores.argMax(-1);  // last dimension
              const scoreData = await classWithMaxScore.data();
              const scoresData = await scores.array();
              const score = scoresData[0][scoreData];

              if(score > 0.6 && scoreData != 494) {
                console.log(`YAMNet class ${scoreData} with score ${scoresData[0][scoreData]}`);


                if (custom.current && scoreData == 461) {
                  const customPrediction = custom.current.predict(reshapedWaveform);
                  const customClassWithMaxScore = customPrediction.argMax(-1);  // last dimension
                  const customScoreData = await customClassWithMaxScore.data();
                  const customScoresData = await customPrediction.array();
                  const customScore = customScoresData[0][customScoreData];
                  
                  console.log(`Custom class ${customScoreData} with score ${customScoreData}`);
                }
              }
              

              

              // const scores  = classifier.current.predict(reshapedWaveform);
              // const classWithMaxScore = scores.argMax(-1);  // last dimension
              // const scoreData = await classWithMaxScore.data();
              // const scoresData = await scores.array();
              // const score = scoresData[0][scoreData]; 
              // console.log(`Class ${scoreData} with score ${scoreData}`);
            }

        };

        // Connect the audio graph
        mediaStreamSource.connect(scriptNode);
        scriptNode.connect(audioContext.current.destination);
        console.log('Audio graph connected');

        // Add further processing code here to convert audio stream to input for TensorFlow model
        // You need to resample your audio to 16kHz, split into 0.975 second segments, 
        // convert each segment into a 1-D waveform tensor and feed into your model
      })
      .catch(error => console.error(error));
  }, []);

/*
  useEffect(() => {
    async function classifyAudio() {
      if (classifier.current) {
        // Assuming your classifier takes a 1-D waveform tensor
        // Fetch a 0.975 second segment of your resampled audio data, then convert it into a tensor
        const waveform = tf.tensor1d(yourResampledAudioSegmentHere);
        
        const prediction = classifier.current.predict(waveform);
        const classWithMaxScore = prediction.argMax();
        const confidenceScore = prediction.max();

        setLabel(classWithMaxScore.dataSync()[0]);
        setConfidence(confidenceScore.dataSync()[0]);
      }
    }

    // Set an interval to perform classification periodically
    const intervalId = setInterval(classifyAudio, 1000);

    return () => clearInterval(intervalId);
  }, []);
*/

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold my-16">Playground</h1>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold my-16">{label}</h1>
        <h1 className="text-5xl font-bold my-16">{confidence}</h1>
      </div>
    </div>
  );
};

export default Playground;
