import '../styles/DifficultyButtons.css'

function DifficultyButtons({ setDifficulty, easy, medium, hard }) {
    return (
        <>
            <div className="difficulty-container">
                <button className="difficulty-button" onClick={() => setDifficulty(easy)}>Easy</button>
                <button className="difficulty-button" onClick={() => setDifficulty(medium)}>Medium</button>
                <button className="difficulty-button" onClick={() => setDifficulty(hard)}>Hard</button>
            </div>
        </>
    );
}

export default DifficultyButtons;
