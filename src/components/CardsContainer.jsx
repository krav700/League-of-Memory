import { useState, useEffect } from "react";
import ChampionImage from "./ChampionImage.jsx";

async function getChampsJSON() {
    let champsNames;
    await fetch(
        "https://ddragon.leagueoflegends.com/cdn/16.1.1/data/en_US/champion.json"
    )
        .then((res) => res.json())
        .then((data) => data.data)
        .then((data) => {
            champsNames = Object.keys(data);
        });
    return champsNames;
}

function getChampionNames(setNameArray) {
    getChampsJSON().then((data) => {
        setNameArray(data);
    });
    return true;
}

function adjustCardSize(cardSize) {
    const allCards = document.querySelectorAll(".card-container");
    if (cardSize == 5) {
        allCards.forEach((card) => {
            card.classList.add("easy-card");
            card.classList.remove("medium-card");
            card.classList.remove("hard-card");
        });
    } else if (cardSize == 15) {
        allCards.forEach((card) => {
            card.classList.remove("easy-card");
            card.classList.add("medium-card");
            card.classList.remove("hard-card");
        });
    } else if (cardSize == 30) {
        allCards.forEach((card) => {
            card.classList.remove("easy-card");
            card.classList.remove("medium-card");
            card.classList.add("hard-card");
        });
    }
}

function fillArrayWithChamps(numOfCards, setCardArray, nameArray) {
    let champsSelected = [];
    for (let i = 0; i < numOfCards; i++) {
        let randomChamp = Math.floor(Math.random() * 172);
        while (champsSelected.includes(randomChamp)) {
            randomChamp = Math.floor(Math.random() * 172);
        }
        champsSelected.push(randomChamp);
        setCardArray((prev) => [
            ...prev,
            { id: prev.length, name: nameArray[randomChamp] },
        ]);
    }
    setCardArray((prev) => [
        ...prev,
        ...prev.map((card) => ({
            ...card,
            id: crypto.randomUUID(),
        })),
    ]);
}

function randomizeChampArray(cardArray, setCardArray) {
    const [hasRan, setHasRan] = useState(true);

    let copyArray = cardArray;
    for (let i = 0, n = cardArray.length; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * n);
        const temp = copyArray[i];
        copyArray[i] = copyArray[randomIndex];
        copyArray[randomIndex] = temp;
    }
    for (let i = 0, n = cardArray.length; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * n);
        const temp = copyArray[i];
        copyArray[i] = copyArray[randomIndex];
        copyArray[randomIndex] = temp;
    }
    if (hasRan) {
        setCardArray(copyArray);
        setHasRan(false);
    }
}

function CardsContainer({ difficulty, lives, cardSize }) {
    const [nameArray, setNameArray] = useState([]);
    const [cardArray, setCardArray] = useState([{ id: 0, name: "" }]);

    let firstRun = true;
    useEffect(() => {
        if (firstRun) {
            firstRun = false;
            getChampionNames(setNameArray);
        }
        return () => {
            setNameArray([]);
        };
    }, []);

    useEffect(() => {
        fillArrayWithChamps(difficulty, setCardArray, nameArray);

        return () => {
            setCardArray([]);
        };
    }, [nameArray, difficulty]);

    return (
        <div className="cards-container">
            {cardArray.length > 0 ? (
                <>
                    {randomizeChampArray(cardArray, setCardArray)}
                    {cardArray.map((card) => {
                        return (
                            <ChampionImage
                                cardSize={cardSize}
                                champ={card}
                                lives={lives}
                                key={card.id}
                            />
                        );
                    })}
                </>
            ) : null}
        </div>
    );
}

export default CardsContainer;
