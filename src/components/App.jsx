import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import CardsContainer from "./CardsContainer.jsx";
import DifficultyButtons from "./DifficultyButtons.jsx";

function App() {
    const [difficulty, setDifficulty] = useState(5);
    const [cardSize, setCardSize] = useState(5);
    let lives = useRef(5);
    return (
        <>
            <DifficultyButtons
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                easy={5}
                medium={10}
                hard={15}
                lives={lives}
                setCardSize={setCardSize}
            />
            <CardsContainer cardSize={cardSize} difficulty={difficulty} lives={lives}/>
        </>
    );
}

export default App;

//TODO lives, champs/skins/items options, style
