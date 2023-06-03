import "./word.scss";

interface WordProps {
  letters: string[];
  letterIndices: number[];
  isGameOver: boolean;
  isWinner: boolean;
}

function Word({ letters, letterIndices, isGameOver, isWinner }: WordProps) {
  const gameEnd = isGameOver || isWinner;
  return (
    <div className="word">
      {letters.map((letter, index) => (
        <div
          className={`letter ${
            isGameOver && isWinner ? "winnerColor" : isGameOver && "looserColor"
          }`}
          key={index}
        >
          {gameEnd ? letter : letterIndices.includes(index) && letter}
        </div>
      ))}
    </div>
  );
}

export default Word;
