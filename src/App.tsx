import { useState, useEffect } from "react";
import FailedAttempts from "./components/failedAttempts/FailedAttempts";
import Word from "./components/word/Word";
import Keyboard from "./components/keyboard/Keyboard";
import { useRefreshGame, useLocalStorage, useWord } from "./hooks/hooks";
import { MAX_MISTAKES } from "./constants/constants";
import LanguageToggler from "./components/languageToggler/LanguageToggler";
import { reloadingPage } from "./services";
import "./App.scss";

function App() {
  const storageLanguage = localStorage.getItem("language") as "eng" | "укр";
  const [currentLanguage, setCurrentLanguage] = useState<"eng" | "укр">(
    storageLanguage || "eng"
  );
  const [lettersOfWord, setLettersOfWord] = useState<string[]>([]);
  const [letterIndices, setLetterIndices] = useState<number[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [correctLetter, setCorrectLetter] = useState<string[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const wordToGuesses = useWord(currentLanguage);

  useLocalStorage(currentLanguage);

  useEffect(() => {
    if (letterIndices.length && lettersOfWord.length === letterIndices.length) {
      setIsWinner(true);
      setIsGameOver(true);
    } else if (wrongLetters.length === MAX_MISTAKES) {
      setIsGameOver(true);
    }
  }, [letterIndices, wrongLetters, lettersOfWord.length]);

  useEffect(() => {
    setLettersOfWord(wordToGuesses.split(""));
  }, [wordToGuesses]);

  useRefreshGame(isGameOver);

  const handleLetterClick = (character: string) => {
    if (lettersOfWord.includes(character)) {
      const indices = lettersOfWord.reduce((acc, letter, idx: number) => {
        if (letter === character) {
          acc.push(idx);
        }
        return acc;
      }, [] as number[]);
      setCorrectLetter([...correctLetter, character]);

      setLetterIndices([...letterIndices, ...indices]);
    } else {
      setWrongLetters([...wrongLetters, character]);
    }
  };

  const chooseLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const language = e.currentTarget.id as "eng" | "укр";
    setCurrentLanguage(language);
    setWrongLetters([]);
    setCorrectLetter([]);
    setLetterIndices([]);
  };

  const mistakes = wrongLetters.length;
  const gameEnd = isGameOver || isWinner;
  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <span>Guess</span>
          <span>the</span>
          <span> w _ _ d</span>
        </div>
        <div className="services">
          <LanguageToggler
            chooseLanguage={chooseLanguage}
            currentLanguage={currentLanguage}
          />
          <button
            type="reset"
            className="refreshBtn"
            onClick={() => {
              reloadingPage();
            }}
          >
            Refresh
          </button>
          {!isGameOver && <FailedAttempts mistakes={mistakes} />}
        </div>
        <Word
          letters={lettersOfWord}
          letterIndices={letterIndices}
          isGameOver={isGameOver}
          isWinner={isWinner}
        />
        {gameEnd ? (
          <>
            <div className="message">
              {isWinner ? "Congratulations. You Win." : "Sorry. Try Again."}
            </div>
          </>
        ) : (
          <Keyboard
            handleLetterClick={handleLetterClick}
            wrongLetters={wrongLetters}
            correctLetter={correctLetter}
            currentLanguage={currentLanguage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
