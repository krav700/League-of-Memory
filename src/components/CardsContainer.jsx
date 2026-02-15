import { useState, useEffect } from "react";
import ChampionImage from "./ChampionImage.jsx";

const CHAMPION_COUNT = 172;

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

function fillArrayWithChamps(numOfCards, setCardArray, nameArray) {
    let champsSelected = [];
    for (let i = 0; i < numOfCards; i++) {
        let randomChamp = Math.floor(Math.random() * CHAMPION_COUNT);
        while (champsSelected.includes(randomChamp)) {
            randomChamp = Math.floor(Math.random() * CHAMPION_COUNT);
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

async function getSkinOfChamp(champ, champsArray, skinsArray) {
    if (!champsArray.includes(champ.name)) {
        await fetch(
            `https://ddragon.leagueoflegends.com/cdn/16.3.1/data/en_US/champion/${champ.name}.json`
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .then((data) => {
                let numArray = [];
                for (let i = 0; i < data[champ.name].skins.length; i++) {
                    numArray.push(data[champ.name].skins[i].num);
                }
                const skinNumber = Math.floor(
                    Math.random() * (numArray.length - 1) + 1
                );
                const skin = numArray[skinNumber];
                champ.skin = skin;
                skinsArray.push(skin);
                champsArray.push(champ.name);
            });
    } else {
        const index = champsArray.indexOf(champ.name);
        champ.skin = skinsArray[index];
    }
}

async function setSkinsOnCardArray(cardArray, setCardArray) {
    let champsArray = [];
    let skinsArray = [];
    let copyOfCardArray = cardArray;
    for (let i = 0; i < copyOfCardArray.length; i++) {
        await getSkinOfChamp(copyOfCardArray[i], champsArray, skinsArray);
    }
    setCardArray(copyOfCardArray);
}

function CardsContainer({ difficulty, lives, cardSize, gamemodeSkins }) {
    const [nameArray, setNameArray] = useState([]);
    const [cardArray, setCardArray] = useState([{ id: 0, name: "", skin: 0 }]);

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

    useEffect(() => {
        if (
            cardArray[cardArray.length - 1].name != undefined &&
            cardArray[cardArray.length - 1].name != ""
        ) {
            setSkinsOnCardArray(cardArray, setCardArray);
        }
    }, [cardArray]);

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
                                gamemodeSkins={gamemodeSkins}
                                skin={card.skin}
                            />
                        );
                    })}
                </>
            ) : null}
        </div>
    );
}

export default CardsContainer;
