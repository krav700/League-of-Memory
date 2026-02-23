import { useEffect } from "react";
import cardBack from "../assets/Your_Shop_Banner.webp";
import "../styles/ChampionImage.css";
import { useState } from "react";
import confetti from "canvas-confetti";

let pickedCards = ["", ""];

async function winAnimation(difficulty) {
    const end = Date.now() + 1 * 1000;
    const colors = ["hsl(0, 100%, 50%)", "hsl(178, 30%, 50%)"];
    let emoji;
    const scalar = 2;
    if (difficulty == 5) {
        emoji = confetti.shapeFromText({ text: "🪙", scalar });
    } else if (difficulty == 10) {
        emoji = confetti.shapeFromText({ text: "⭐️", scalar });
    } else {
        emoji = confetti.shapeFromText({ text: "💎", scalar });
    }
    const cryingFace = confetti.shapeFromText({ text: "😭", scalar });

    (function frame() {
        confetti({
            particleCount: 1,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            shapes: [emoji],
            scalar,
        });
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });
        confetti({
            particleCount: 1,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            shapes: [emoji],
            scalar,
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

async function looseAnimation() {
    const scalar = 2;
    const cryingFace = confetti.shapeFromText({ text: "😭", scalar });
    const end = Date.now() + 1 * 1000;
    const colors = ["rgb(0, 0, 0)"];

    (function frame() {
        confetti({
            particleCount: 1,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            shapes: [cryingFace],
            scalar,
        });
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });
        confetti({
            particleCount: 1,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            shapes: [cryingFace],
            scalar,
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function cardsShuffleAnimation() {
    const cardsContainer = document.querySelector(".cards-container");
    const cards = document.querySelectorAll(".card-container");

    const containerRect = cardsContainer.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();

        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const dx = centerX - (cardCenterX - containerRect.left);
        const dy = centerY - (cardCenterY - containerRect.top);

        card.style.transform = `translate(${dx}px, ${dy}px)`;
        card.style.pointerEvents = 'none';
    });
}

function unShuffleAnimation() {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.style.gap = "1rem";

    const cards = document.querySelectorAll(".card-container");
    cards.forEach(card => {
        card.style.left = "0";
        card.style.top = "0";
        card.style.transform = "translate(0, 0)";
        card.style.pointerEvents = 'auto';
    });
}


function ChampionImage({
    champ,
    lives,
    setLives,
    cardSize,
    gamemodeSkins,
    difficulty,
    doneRenderingSkins,
    setEasyWins,
    setMediumWins,
    setHardWins,
}) {
    const [sizeClass, setSizeClass] = useState("easy");
    const [, forceRender] = useState(0);
    const resetBtn = document.querySelector(".reset-game-btn");

    useEffect(() => {
        document.querySelector(".reset-game-btn").classList.remove("appear");;
        const cardContainer = document.querySelectorAll(".card");
        if (
            (gamemodeSkins == true && champ.skin == undefined) ||
            champ.skin == 0
        ) {
            setTimeout(() => {
                forceRender((prev) => prev + 1);
                cardContainer.forEach(card => {
                    card.style.transition = "transform 0.6s";
                });
            }, 1000);

        } else {
            setTimeout(() => {
                forceRender((prev) => prev + 1);
                cardContainer.forEach(card => {
                    card.style.transition = "transform 0.6s";
                });
            }, 50);
        }
        setTimeout(() => {
            cardsShuffleAnimation();
        }, 100)
        setTimeout(() => {
            unShuffleAnimation();
        }, 700)
    }, [difficulty, doneRenderingSkins]);

    function lostGame() {
        if (lives - 1 == 0) {
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
            resetBtn.classList.add("appear");
            const cardContainer = document.querySelectorAll(".card");
            cardContainer.forEach(card => {
                card.style.transition = "transform 0s";
            });
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
            winAnimation(difficulty);
            resetBtn.classList.add("appear");
            if (difficulty == 5) {
                setEasyWins((prev) => prev + 1);
            } else if (difficulty == 10) {
                setMediumWins((prev) => prev + 1);
            } else if (difficulty == 15) {
                setHardWins((prev) => prev + 1);
            }
            const cardContainer = document.querySelectorAll(".card");
            cardContainer.forEach(card => {
                card.style.transition = "transform 0s";
            });
        }
    }

    function handleClick(e) {
        e.target.parentElement.style.pointerEvents = "none";
        if (e.target.parentElement.classList.contains("cards-container")) {
            return;
        }
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
                    setLives((prev) => prev - 1);
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
        const allCards = document.querySelectorAll(".card-container");
        allCards.forEach((card) => {
            card.style.pointerEvents = "auto";
        });
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
                    champ.name == "Fiddlesticks" ? "FiddleSticks" : champ.name
                }_${gamemodeSkins ? champ.skin ?? 0 : 0}.jpg`}
                onError={(e) => {
                    e.target.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.name}_0.jpg`;
                }}
                draggable={false}
            />
            <img className="card" src={cardBack} draggable={false} />
        </div>
    );
}

export default ChampionImage;
