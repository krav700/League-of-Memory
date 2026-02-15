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

    let onLoadDifficulty = true;
    useEffect(() => {
        let button;
        if (onLoadDifficulty && localStorage.getItem("difficulty")) {
            onLoadDifficulty = false;
            if (localStorage.getItem("difficulty") == 5) {
                button = 0;
            } else if (localStorage.getItem("difficulty") == 10) {
                button = 1;
            } else if (localStorage.getItem("difficulty") == 15) {
                button = 2;
            }
            const diffContainer = document.querySelector(".difficulty-container");
            diffContainer.children[0].classList.remove("disabled");
            diffContainer.children[button].classList.add("disabled");
        }
    }, []);

    return (
        <>
            <div className="difficulty-container button-container">
                <button
                    onClick={(e) => {
                        setDifficulty(easy);
                        lives.current = easy;
                        setCardSize(5);
                        e.target.classList.add("disabled");
                        e.target.parentElement.children[1].classList.remove("disabled");
                        e.target.parentElement.lastChild.classList.remove("disabled");
                        localStorage.setItem("difficulty", 5);
                    }}
                    className={`easy-button disabled`}
                    data-text={"Easy"}
                >
                    Easy
                </button>
                <button
                    onClick={(e) => {
                        setDifficulty(medium);
                        lives.current = medium;
                        setCardSize(10);
                        e.target.classList.add("disabled");
                        e.target.parentElement.firstChild.classList.remove("disabled");
                        e.target.parentElement.lastChild.classList.remove("disabled");
                        localStorage.setItem("difficulty", 10);
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
                        setCardSize(15);
                        e.target.classList.add("disabled");
                        e.target.parentElement.firstChild.classList.remove("disabled");
                        e.target.parentElement.children[1].classList.remove("disabled");
                        localStorage.setItem("difficulty", 15);
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
