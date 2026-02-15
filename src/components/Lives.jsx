import "../styles/Scores.css";

function Lives({ lives }) {
    return (
        <div className="lives">
            <h2>Lives: {lives}</h2>
        </div>
    );
}

export default Lives;
