import { useEffect } from "react";
import "../styles/Scores.css";

function Scores({ easyWins, mediumWins, hardWins }) {

    useEffect(() => {
        localStorage.setItem("easyWins", easyWins);
    }, [easyWins]);

    useEffect(() => {
        localStorage.setItem("mediumWins", mediumWins);
    }, [mediumWins]);

    useEffect(() => {
        localStorage.setItem("hardWins", hardWins);
    }, [hardWins]);

    return (
        <div className="scores">
            <h2>Easy Wins: {easyWins}</h2>
            <h2>Medium Wins: {mediumWins}</h2>
            <h2>Hard Wins: {hardWins}</h2>
        </div>
    );
}

export default Scores;
