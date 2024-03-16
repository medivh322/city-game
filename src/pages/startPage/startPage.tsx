import { Dispatch, SetStateAction } from "react";

const StartPage = ({
  onClickStartGame,
}: {
  onClickStartGame: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="flex items-center justify-center h-16 text-base">
        Игра в города на время
      </div>
      <div className="h-[3px] bg-[#F4F4F5]"></div>
      <div className="p-6 text-sm prose max-w-none">
        Цель: Назвать как можно больше реальных городов.
        <ul className="mt-6 list-disc">
          <li>Запрещается повторение городов.</li>
          <li>
            Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого
            бы пропускаем эту букву и игрок должен назвать город на букву
            стоящую перед ъ или ь знаком.
          </li>
          <li>
            Каждому игроку дается 2 минуты на размышления, если спустя это время
            игрок не вводит слово он считается проигравшим
          </li>
        </ul>
        <button
          onClick={() => onClickStartGame(true)}
          className="text-white bg-purple-600 rounded px-4 h-10 mx-auto block mt-6 text-base"
        >
          Начать игру
        </button>
      </div>
    </>
  );
};

export default StartPage;
