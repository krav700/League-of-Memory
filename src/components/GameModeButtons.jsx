import "../styles/DifficultyButtons.css";

function GameModeButtons({ setGamemodeSkins }) {
    return (
        <>
            <div className="difficulty-container">
                <button
                    onClick={(e) => {
                        setGamemodeSkins(false);
                        e.target.classList.add("disabled");
                        e.target.parentElement.children[1].classList.remove("disabled");
                    }}
                    className="disabled"
                    data-text={"Champions"}
                >
                    Champions
                </button>
                <button
                    onClick={(e) => {
                        setGamemodeSkins(true);
                        e.target.parentElement.children[0].classList.remove("disabled");
                        e.target.classList.add("disabled");
                    }}
                    data-text={"Skins"}
                >
                    Skins
                </button>
            </div>
        </>
    );
}

export default GameModeButtons;
