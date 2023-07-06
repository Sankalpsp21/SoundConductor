import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Playground = () => {
  const classifier = useRef<any>(null);
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
