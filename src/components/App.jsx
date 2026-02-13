import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import CardsContainer from "./CardsContainer.jsx";
import DifficultyButtons from "./DifficultyButtons.jsx";

function App() {
    const [difficulty, setDifficulty] = useState(5);
    const lives = useRef(5);
    return (
        <>
            <DifficultyButtons
                setDifficulty={setDifficulty}
                easy={5}
                medium={10}
                hard={15}
            />
            <CardsContainer difficulty={difficulty} lives={lives}/>
        </>
    );
}

export default App;

//TODO lives, champs/skins/items options, style
