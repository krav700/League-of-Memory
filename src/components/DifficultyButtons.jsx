import "../styles/DifficultyButtons.css";

function DifficultyButtons({ setDifficulty, easy, medium, hard }) {
    return (
        <>
            <div className="difficulty-container">
                <button
                    className="difficulty-button"
                    onClick={() => setDifficulty(easy)}
                    data-text={"Easy"}
                >
                    Easy
                </button>
                <button
                    className="difficulty-button"
                    onClick={() => setDifficulty(medium)}
                    data-text={"Medium"}
                >
                    Medium
                </button>
                <button
                    className="difficulty-button"
                    onClick={() => setDifficulty(hard)}
                    data-text={"Hard"}
                >
                    Hard
                </button>
            </div>
        </>
    );
}

export default DifficultyButtons;
