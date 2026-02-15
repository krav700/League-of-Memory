import "../styles/Scores.css";

function Scores({ easyWins, mediumWins, hardWins }) {
    return (
        <div className="scores">
            <h2>Easy Wins: {easyWins}</h2>
            <h2>Medium Wins: {mediumWins}</h2>
            <h2>Hard Wins: {hardWins}</h2>
        </div>
    );
}

export default Scores;
