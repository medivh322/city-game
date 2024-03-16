import { useEffect, useMemo, useRef, useState } from "react";
import { listCities } from "../../cities";
import { IPropsFillEndGameObject } from "../../App";
import Galochka from "../../assets/galochka.svg";

const ActiveGame = ({
  endGameFillObject,
}: {
  endGameFillObject: (props: IPropsFillEndGameObject) => void;
}) => {
  const [playerRound, setPlayerRound] = useState<boolean>(true);
  const [citiesUsed, setCitiesUsed] = useState<string[] | null>(null);
  const [timer, setTimer] = useState<number>(120);
  const [computerFailed, setcomputerFailed] = useState<boolean | null>(null);

  const cities = useMemo(() => listCities, []);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!timer)
      endGameFillObject({
        isWinPlayer: !playerRound,
        time: getTime(timer),
        citiesUsed,
      });
    const timerFn = setTimeout(() => {
      setTimer((second) => second - 1);
    }, 1000);
    return () => clearTimeout(timerFn);
  });

  useEffect(() => {
    if (computerFailed)
      endGameFillObject({
        isWinPlayer: true,
        time: getTime(timer),
        citiesUsed,
      });
  }, [citiesUsed, computerFailed, endGameFillObject, timer]);

  useEffect(() => {
    if (citiesUsed) {
      setPlayerRound((prev) => !prev);
      setTimer(120);
    }
  }, [citiesUsed]);

  useEffect(() => {
    if (!playerRound && citiesUsed) {
      const newResponseDelayValue = Math.floor(
        Math.random() * (10 - 1 + 1) + 1
      );

      const lastCityUsed = citiesUsed[citiesUsed.length - 1].toLowerCase();
      const lastChar = lastCityUsed.charAt(lastCityUsed.length - 1);
      const formattedCitiesUsed = citiesUsed.map((cityUsed) =>
        cityUsed.toLowerCase()
      );

      const possibleAnswers = cities.filter((city) => {
        const lowercaseCity = city.toLowerCase();
        return (
          !formattedCitiesUsed.includes(lowercaseCity) &&
          lowercaseCity.charAt(0) === lastChar
        );
      });

      const timeout = setTimeout(() => {
        if (!possibleAnswers.length) {
          setcomputerFailed(true);
          return;
        }
        setCitiesUsed((prev) => prev && [...prev, possibleAnswers[0]]);
      }, newResponseDelayValue * 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [cities, citiesUsed, playerRound]);

  const getCurrentPlaceholder = () => {
    if (!playerRound) return "Ожидаем ответа соперника...";
  };

  const getTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
  };

  const pushAnswer = (city: string) => {
    if (!city.length) {
      alert("введите город");
      return;
    }
    if (!citiesUsed) {
      setCitiesUsed([city]);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (
      city[0] !==
      citiesUsed[citiesUsed?.length - 1]
        .charAt(citiesUsed[citiesUsed?.length - 1].length - 1)
        .toLowerCase()
    ) {
      alert("введите корректный город по последней букве города");
      return;
    }
    if (citiesUsed.includes(city)) {
      alert("этот город уже был введен ранее");
      return;
    }

    setCitiesUsed((prev) => {
      if (prev !== null) return [...prev, city];
      return prev;
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <div className="flex items-center h-16 justify-between px-4">
        <p className="text-base">
          {playerRound ? "Сейчас ваша очередь" : "Сейчас очередь соперника"}
        </p>
        <p className="text-xl">{getTime(timer)}</p>
      </div>
      <div className="h-[5px] bg-[#F4F4F5] relative">
        <div
          className="absolute h-full left-0 top-0 bg-purple-300 w-full"
          style={{ width: `${(timer / 120) * 100}%` }}
        ></div>
      </div>
      <div className="px-4 h-80 overflow-y-scroll mr-[-17px] relative">
        {citiesUsed ? (
          <ul className="mt-6 grid grid-cols-1 gap-2">
            {citiesUsed.map((city, i) => (
              <li
                className={`${
                  i % 2 === 0
                    ? "ml-auto bg-purple-500 text-white"
                    : "mr-auto bg-purple-50 text-[#3F3F46]"
                } py-1.5 px-3 rounded-md`}
                key={i}
              >
                {city}
              </li>
            ))}
          </ul>
        ) : (
          <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-sm text-[#A1A1AA]">
            Первый участник вспоминает города...
          </p>
        )}
      </div>
      {citiesUsed && (
        <p className="text-center text-[#A1A1AA] mb-[16px]">
          Всего перечислено городов: {citiesUsed.length}
        </p>
      )}
      <div className="grid p-2 grid-cols-[1fr_32px] items-center bg-[#F3F4F6] h-12 mb-4 mx-4 rounded-md">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent focus:outline-none placeholder-gray-700"
          disabled={!playerRound}
          placeholder={
            !citiesUsed
              ? "Напишите любой город, например: Где вы живете?"
              : getCurrentPlaceholder()
          }
        />
        <button
          onClick={() =>
            inputRef.current &&
            playerRound &&
            pushAnswer(inputRef.current.value.trim().toLowerCase())
          }
          disabled={!playerRound}
          className={`${
            playerRound ? "bg-purple-500" : "bg-[#A1A1AA]"
          } h-8 rounded flex justify-center items-center`}
        >
          <img src={Galochka} />
        </button>
      </div>
    </>
  );
};

export default ActiveGame;
