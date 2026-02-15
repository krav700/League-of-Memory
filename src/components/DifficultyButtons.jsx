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
                    onClick={(e) => {
                        setDifficulty(easy);
                        lives.current = easy;
                        setCardSize(5);
                        e.target.classList.add("disabled");
                        e.target.parentElement.children[1].classList.remove("disabled");
                        e.target.parentElement.lastChild.classList.remove("disabled");
                    }}
                    className={"easy-button disabled"}
                    data-text={"Easy"}
                >
                    Easy
                </button>
                <button
                    onClick={(e) => {
                        setDifficulty(medium);
                        lives.current = medium;
                        setCardSize(15);
                        e.target.classList.add("disabled");
                        e.target.parentElement.firstChild.classList.remove("disabled");
                        e.target.parentElement.lastChild.classList.remove("disabled");
                    }}
                    className={"medium-button"}
                    data-text={"Medium"}
                >
                    Medium
                </button>
                <button
                    onClick={(e) => {
                        setDifficulty(hard);
                        lives.current = hard;
                        setCardSize(30);
                        e.target.classList.add("disabled");
                        e.target.parentElement.firstChild.classList.remove("disabled");
                        e.target.parentElement.children[1].classList.remove("disabled");
                    }}
                    className={"hard-button"}
                    data-text={"Hard"}
                >
                    Hard
                </button>
            </div>
        </>
    );
}

export default DifficultyButtons;
