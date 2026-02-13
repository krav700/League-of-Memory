import { useState, useEffect } from "react";
import "../styles/App.css";
import CardsContainer from "./CardsContainer.jsx";
import DifficultyButtons from "./DifficultyButton.jsx";

function App() {
    const [difficulty, setDifficulty] = useState(5);

    return (
        <>
            <DifficultyButtons
                setDifficulty={setDifficulty}
                easy={5}
                medium={10}
                hard={15}
            />
            <CardsContainer difficulty={difficulty} />
        </>
    );
}

export default App;

//TODO lives, difficulty, champs/skins/items options, style
