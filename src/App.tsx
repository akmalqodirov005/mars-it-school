import { useState } from "react";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";

const App = () => {
  const [started, setStarted] = useState(false);
  const [onMusic, setOnMusic] = useState(false);

  return (
    <>
      {!started ? (
        <LandingPage
          onEnter={() => {
            setStarted(true);
            setOnMusic(true);
          }}
          onContinue={() => {
            setStarted(true);
            setOnMusic(false);
          }}
        />
      ) : (
        <MainPage onMusic={onMusic} />
      )}
    </>
  );
};

export default App;
