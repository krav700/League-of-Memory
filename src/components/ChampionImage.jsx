import { useEffect } from "react";
import cardBack from "../assets/Your_Shop_Banner.webp";
import '../styles/ChampionImage.css';

let pickedCards = ["", ""];

function ChampionImage({ champ, lives }) {

    function lostGame() {
        if (lives.current == 0) {
            const allCards = document.querySelectorAll(".card-container");
            allCards.forEach(card => {
                if (card.classList.contains("rotate")) {
                    card.classList.add("correct-guess");
                } else {
                    card.classList.add("wrong-guess");
                }
            });
            allCards.forEach(card => {
                card.classList.add("rotate")
            });
        }
    }

    function winGame() {
        const allCards = document.querySelectorAll(".card-container");
        let win = true;
        allCards.forEach(card => {
            if (!card.classList.contains("rotate")) {
                win = false;
            }
        });
        if (win) {
            allCards.forEach(card => {
                card.classList.add("correct-guess");
            });
        }
    }

    function handleClick(e) {
        e.target.parentElement.style.pointerEvents = "none";
        e.target.parentElement.classList.add("rotate");

        pickedCards[1] = champ.name;
        if (!pickedCards[0]) {
            pickedCards[0] = champ.name;
            e.target.parentElement.style.pointerEvents = "none";
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
                        if (!card.classList.contains("rotate")) {
                            card.style.pointerEvents = "auto";
                        }
                    });
                    lives.current = lives.current - 1;
                    console.log(lives)
                    lostGame();
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
                winGame();
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
