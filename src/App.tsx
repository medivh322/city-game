import { useState } from "react";
import ActiveGame from "./pages/ActiveGame/ActiveGame";
import EndGame from "./pages/EndGame/EndGame";
import StartPage from "./pages/StartPage/StartPage";

export interface IGameSettings {
  playerWin: boolean;
  timer: string;
  totalCountCities: number | null;
  lastCity: string | null;
}

export interface IPropsFillEndGameObject {
  isWinPlayer: boolean;
  time: string;
  citiesUsed: string[] | null;
}

function App() {
  const [start, setStart] = useState<boolean>(false);
  const [endGameSettings, setEndGameSettings] = useState<IGameSettings | null>(
    null
  );

  const endGameFillObject = ({
    isWinPlayer,
    time,
    citiesUsed,
  }: IPropsFillEndGameObject) => {
    setEndGameSettings({
      playerWin: isWinPlayer,
      timer: time,
      totalCountCities: citiesUsed ? citiesUsed.length : null,
      lastCity: citiesUsed ? citiesUsed[citiesUsed.length - 1] : null,
    });
  };

  return (
    <div className="h-dvh flex items-center justify-center bg-gray-200">
      <div className="max-w-xl w-full rounded-xl bg-white shadow overflow-hidden">
        {!start && !endGameSettings ? (
          <StartPage onClickStartGame={setStart} />
        ) : !endGameSettings ? (
          <ActiveGame endGameFillObject={endGameFillObject} />
        ) : (
          <EndGame
            endGameSettings={endGameSettings}
            restart={() => {
              setStart(true);
              setEndGameSettings(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
