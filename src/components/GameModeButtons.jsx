import { useEffect } from "react";
import "../styles/GameModeButtons.css";

function GameModeButtons({setGamemodeSkins}) {
    return (
        <>
            <div className="gamemode-container">
                <button className="gamemode-button" onClick={() => {setGamemodeSkins(false)}}>Champions</button>
                <button className="gamemode-button" onClick={() => {setGamemodeSkins(true)}}>Skins</button>
            </div>
        </>
    );
}

export default GameModeButtons;