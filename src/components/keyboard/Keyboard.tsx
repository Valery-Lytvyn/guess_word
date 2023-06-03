import { useKeyboard } from "../../hooks/hooks";
import "./keyboard.scss";

interface KeyboardProps {
  handleLetterClick: (character: string) => void;
  wrongLetters: string[];
  correctLetter: string[];
  currentLanguage: "eng" | "укр";
}

function Keyboard({
  handleLetterClick,
  wrongLetters,
  correctLetter,
  currentLanguage,
}: KeyboardProps) {
  const keys = useKeyboard(currentLanguage);
  return (
    <div className="keyboard">
      {keys?.map((key) => {
        const isWrong = wrongLetters.includes(key);
        const isCorrect = correctLetter.includes(key);
        return (
          <button
            className={`button ${isWrong && "wrongBtn"} ${
              isCorrect && "correctBtn"
            }`}
            key={key}
            disabled={isWrong || isCorrect}
            onClick={() => handleLetterClick(key)}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;
