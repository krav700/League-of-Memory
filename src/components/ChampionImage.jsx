import { useEffect } from "react";
import cardBack from "../assets/Your_Shop_Banner.webp";
import "../styles/ChampionImage.css";
import { useState } from "react";
import confetti from "canvas-confetti";

let pickedCards = ["", ""];

async function winAnimation() {
    const end = Date.now() + (1 * 1000);
    const colors = ['rgb(255, 255, 255)', 'hsl(178, 30%, 50%)'];

    (function frame() {
    confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }());
}

async function looseAnimation() {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: '😭', scalar });
    const end = Date.now() + (1 * 1000);

    (function frame() {
    confetti({
        particleCount: 1,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: [unicorn],
        scalar
    });
    confetti({
        particleCount: 1,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: [unicorn],
        scalar
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }());
}

function ChampionImage({
    champ,
    lives,
    cardSize,
    gamemodeSkins,
    difficulty,
    doneRenderingSkins
}) {
    const [sizeClass, setSizeClass] = useState("easy");
    const [, forceRender] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            forceRender((prev) => prev + 1);
        }, 500);
    }, [difficulty, doneRenderingSkins]);

    function lostGame() {
        if (lives.current == 0) {
            const allCards = document.querySelectorAll(".card-container");
            allCards.forEach((card) => {
                if (card.classList.contains("rotate")) {
                    card.classList.add("correct-guess");
                } else {
                    card.classList.add("wrong-guess");
                }
            });
            allCards.forEach((card) => {
                card.classList.add("rotate");
            });
            looseAnimation();
        }
    }
    
    function winGame() {
        const allCards = document.querySelectorAll(".card-container");
        let win = true;
        allCards.forEach((card) => {
            if (!card.classList.contains("rotate")) {
                win = false;
            }
        });
        if (win) {
            allCards.forEach((card) => {
                card.classList.add("correct-guess");
            });
            winAnimation();
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

    useEffect(() => {
        if (cardSize == 5) {
            setSizeClass("easy");
        } else if (cardSize == 10) {
            setSizeClass("medium");
        } else if (cardSize == 15) {
            setSizeClass("hard");
        }
    }, [cardSize]);

    return (
        <div
                        className={`card-container ${champ.name}  ${sizeClass}-card`}
            onClick={(e) => handleClick(e)}
            draggable={false}
        >
            <img
                className={"card-back"}
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                    champ.name
                }_${gamemodeSkins ? champ.skin ?? "0" : "0"}.jpg`}
                draggable={false}
            />
            <img className="card" src={cardBack} draggable={false} />
        </div>
    );
}

export default ChampionImage;
