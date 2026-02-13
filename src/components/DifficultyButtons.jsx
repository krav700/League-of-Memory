import { useEffect } from "react";
import "../styles/DifficultyButtons.css";

function DifficultyButtons({
    setCardSize,
    setDifficulty,
    easy,
    medium,
    hard,
    lives,
}) {
    return (
        <>
            <div className="difficulty-container">
                <button
                    className="difficulty-button"
                    onClick={() => {
                        setDifficulty(easy);
                        lives.current = 5;
                        setCardSize(5);
                    }}
                    data-text={"Easy"}
                >
                    Easy
                </button>
                <button
                    className="difficulty-button"
                    onClick={() => {
                        setDifficulty(medium);
                        lives.current = 15;
                        setCardSize(15);
                    }}
                    data-text={"Medium"}
                >
                    Medium
                </button>
                <button
                    className="difficulty-button"
                    onClick={() => {
                        setDifficulty(hard);
                        lives.current = 30;
                        setCardSize(30);
                    }}
                    data-text={"Hard"}
                >
                    Hard
                </button>
            </div>
        </>
    );
}

export default DifficultyButtons;
