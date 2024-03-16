import { IGameSettings } from "../../App";

const EndGame = ({
  endGameSettings,
  restart,
}: {
  endGameSettings: IGameSettings;
  restart: () => void;
}) => {
  return (
    <div className="p-10 grid grid-cols-1 gap-8">
      <div className="text-center text-xl">
        {endGameSettings.playerWin ? (
          <p>
            Поздравляем тебя с победой!
            <br /> Твой противник не вспомнил нужный город!
          </p>
        ) : (
          <p>
            К сожалению твое время вышло! <br />
            Твой противник победил!
          </p>
        )}
      </div>
      <p
        className={`${
          endGameSettings.playerWin ? "text-[#16A34A]" : "text-red-600"
        } text-center text-3xl`}
      >
        {endGameSettings.timer}
      </p>
      {endGameSettings.totalCountCities && (
        <div className="text-center text-xl">
          Всего было перечислено городов:
          {endGameSettings.totalCountCities} <p>Очень не плохой результат!</p>
        </div>
      )}
      {endGameSettings.lastCity && (
        <div className="text-center">
          <p className="text-xl">Последний город названный победителем</p>
          <p className="text-2xl mt-1.5 font-bold">
            {endGameSettings.lastCity}
          </p>
        </div>
      )}
      <button
        onClick={restart}
        className="text-white bg-purple-600 rounded px-4 h-10 mx-auto block mt-6 text-base"
      >
        Начать новую игру
      </button>
    </div>
  );
};

export default EndGame;
