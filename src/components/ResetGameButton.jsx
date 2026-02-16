import "../styles/Buttons.css";

function ResetGameButton({
    difficulty,
    setDifficulty,
    setLives,
    setCardSize,
    resetGame,
    setResetGame,
}) {
    function resetGameFunk(e) {
        setResetGame(!resetGame);
        if (difficulty == 5) {
            setDifficulty(5);
            setLives(5);
            setCardSize(5);
        } else if (difficulty == 10) {
            setDifficulty(10);
            setLives(10);
            setCardSize(10);
        } else if (difficulty == 15) {
            setDifficulty(15);
            setLives(15);
            setCardSize(15);
        }
        e.target.classList.remove("appear");
    }

    return (
        <button
            className="reset-game-btn"
            onClick={(e) => {
                resetGameFunk(e);
            }}
            data-text={"New Game"}
        >
            New Game
        </button>
    );
}

export default ResetGameButton;
