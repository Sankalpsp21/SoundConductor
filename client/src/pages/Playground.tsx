import ml5 from 'ml5';
import { useEffect, useRef, useState } from 'react';

const Playground = () => {
  const classifier = useRef(null);
  const audioContext = useRef(null);
  const [label, setLabel] = useState('waiting...');
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {

    function modelReady() {
      console.log("Model is now ready!");
    }

    function gotResult(error: any, results: any) {
      if (error) {
        console.error(error);
      }
      console.log(results);
      setLabel(results[0].label);
      setConfidence(results[0].confidence.toFixed(4));
    }

    (async () => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
          setLabel('listening...');
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const options = { probabilityThreshold: 0.9 };
          classifier.current = ml5.soundClassifier("SpeechCommands18w", options, modelReady);
          classifier.current.classify(source, gotResult);
        })
        .catch((err) => {
          setLabel('error');
          console.error(err);
        });
    })();

  }, [classifier, audioContext]);


  return (
    <>
      <>
        <div className='container mx-auto'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold my-16'>Playground</h1>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold my-16'>{label}</h1>
            <h1 className='text-5xl font-bold my-16'>{confidence}</h1>
          </div>
        </div>
      </>
    </>
  )
}

export default Playground