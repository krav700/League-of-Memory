import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import CardsContainer from "./CardsContainer.jsx";
import DifficultyButtons from "./DifficultyButtons.jsx";
import GameModeButtons from "./GameModeButtons.jsx";

function App() {
    let saveGameMode = (localStorage.getItem("gamemodeSkins") == "true" ? true : false);
    const [difficulty, setDifficulty] = useState(localStorage.getItem("difficulty")?? 5);
    const [cardSize, setCardSize] = useState(localStorage.getItem("difficulty")?? 5);
    const [gamemodeSkins, setGamemodeSkins] = useState(saveGameMode?? false);
    let lives = useRef(localStorage.getItem("difficulty")?? 5);
    return (
        <>
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
            />
            <CardsContainer
                cardSize={cardSize}
                difficulty={difficulty}
                lives={lives}
                gamemodeSkins={gamemodeSkins}
            />
        </>
    );
}

export default App;

//TODO lives, champs/skins/items options, style
