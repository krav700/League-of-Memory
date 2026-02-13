import cardBack from "../assets/Your_Shop_Banner.webp";

let pickedCards = ["", ""];

function ChampionImage({ champ }) {
    function handleClick(e) {
        e.target.parentElement.style.pointerEvents = "none";
        e.target.parentElement.classList.add("rotate");

        pickedCards[1] = champ.name;
        if (!pickedCards[0]) {
            pickedCards[0] = champ.name;
            e.target.parentElement.style.pointerEvents = "auto";
            return;
        } else {
            if (pickedCards[0] != pickedCards[1]) {
                const allCards = document.querySelectorAll(".card-container");
                allCards.forEach((card) => {
                    card.style.pointerEvents = "none";
                });
                setTimeout(() => {
                    const champCards = document.querySelectorAll(
                        `.${pickedCards[0]}`
                    );
                    champCards.forEach((card) => {
                        card.classList.remove("rotate");
                    });
                    e.target.parentElement.classList.remove("rotate");
                    pickedCards[0] = "";
                    e.target.parentElement.style.pointerEvents = "auto";
                    allCards.forEach((card) => {
                        card.style.pointerEvents = "auto";
                    });
                }, 1000);
            } else {
                const champCards = document.querySelectorAll(
                    `.${pickedCards[0]}`
                );
                champCards.forEach((card) => {
                    card.classList.add("correct-match");
                });
                e.target.parentElement.classList.add("correct-match");
                pickedCards[0] = "";
            }
        }
    }

    return (
        <div
            className={`card-container ${champ.name}`}
            onClick={(e) => handleClick(e)}
        >
            <img
                className="card-back"
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.name}_0.jpg`}
            />
            <img className="card" src={cardBack} />
        </div>
    );
}

export default ChampionImage;
