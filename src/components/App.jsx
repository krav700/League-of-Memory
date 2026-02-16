import { useState } from "react";
import "../styles/App.css";
import CardsContainer from "./CardsContainer.jsx";
import DifficultyButtons from "./DifficultyButtons.jsx";
import GameModeButtons from "./GameModeButtons.jsx";
import Scores from "./Scores.jsx";
import Lives from "./Lives.jsx";

function App() {
    let saveGameMode =
        localStorage.getItem("gamemodeSkins") == "true" ? true : false;
    const [lives, setLives] = useState(localStorage.getItem("difficulty") ?? 5);
    const [difficulty, setDifficulty] = useState(
        localStorage.getItem("difficulty") ?? 5
    );
    const [cardSize, setCardSize] = useState(
        localStorage.getItem("difficulty") ?? 5
    );
    const [gamemodeSkins, setGamemodeSkins] = useState(saveGameMode ?? false);

    const [easyWins, setEasyWins] = useState(
        Number(localStorage.getItem("easyWins")) ?? 0
    );
    const [mediumWins, setMediumWins] = useState(
        Number(localStorage.getItem("mediumWins")) ?? 0
    );
    const [hardWins, setHardWins] = useState(
        Number(localStorage.getItem("hardWins")) ?? 0
    );
    const [resetGame, setResetGame] = useState(false);
    return (
        <>
            <Lives lives={lives} />
            <Scores
                easyWins={easyWins}
                mediumWins={mediumWins}
                hardWins={hardWins}
            />
            <h1>League of Memory</h1>
            <GameModeButtons setGamemodeSkins={setGamemodeSkins} />
            <DifficultyButtons
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                easy={5}
                medium={10}
                hard={15}
                lives={lives}
                setCardSize={setCardSize}
                setLives={setLives}
            />
            <CardsContainer
                resetGame={resetGame}
                setResetGame={setResetGame}
                cardSize={cardSize}
                setCardSize={setCardSize}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                lives={lives}
                setLives={setLives}
                gamemodeSkins={gamemodeSkins}
                easyWins={easyWins}
                mediumWins={easyWins}
                hardWins={easyWins}
                setEasyWins={setEasyWins}
                setMediumWins={setMediumWins}
                setHardWins={setHardWins}
            />
        </>
    );
}

export default App;
