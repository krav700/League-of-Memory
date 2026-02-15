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

function fillArrayWithChamps(numOfCards, nameArray) {
    let champsSelected = [];
    let newArray = [];
    for (let i = 0; i < numOfCards; i++) {
        let randomChamp = Math.floor(Math.random() * CHAMPION_COUNT);
        while (champsSelected.includes(randomChamp)) {
            randomChamp = Math.floor(Math.random() * CHAMPION_COUNT);
        }
        champsSelected.push(randomChamp);
        newArray.push({ id: i, name: nameArray[randomChamp], skin: 0 });
    }
    for (let i = 0, n = newArray.length; i < n; i++) {
        newArray.push({
            id: crypto.randomUUID(),
            name: newArray[i].name,
            skin: 0,
        });
    }
    return newArray;
}

function randomizeChampArray(cardArray) {
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
    return copyArray;
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

async function setSkinsOnCardArray(
    cardArray,
    setCardArray,
    setDoneRenderingSkins
) {
    let champsArray = [];
    let skinsArray = [];
    let copyOfCardArray = cardArray;
    for (let i = 0; i < copyOfCardArray.length; i++) {
        await getSkinOfChamp(copyOfCardArray[i], champsArray, skinsArray);
    }
    setCardArray(copyOfCardArray);
    setDoneRenderingSkins(true);
}

function CardsContainer({
    difficulty,
    lives,
    setLives,
    cardSize,
    gamemodeSkins,
    easyWins,
    mediumWins,
    hardWins,
    setEasyWins,
    setMediumWins,
    setHardWins,
}) {
    const [nameArray, setNameArray] = useState([]);
    const [cardArray, setCardArray] = useState([{ id: 0, name: "", skin: 0 }]);
    const [doneRenderingSkins, setDoneRenderingSkins] = useState(false);

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
        const filledArray = fillArrayWithChamps(difficulty, nameArray);
        const randomChamps = randomizeChampArray(filledArray);
        setCardArray(randomChamps);
        return () => {
            setCardArray([]);
        };
    }, [nameArray, difficulty]);

    useEffect(() => {
        if (
            cardArray[cardArray.length - 1].name != undefined &&
            cardArray[cardArray.length - 1].name != ""
        ) {
            setSkinsOnCardArray(cardArray, setCardArray, setDoneRenderingSkins);
        }
    }, [cardArray]);

    return (
        <div className="cards-container">
            {cardArray.length > 0 ? (
                <>
                    {cardArray.map((card) => {
                        return (
                            <ChampionImage
                                cardSize={cardSize}
                                champ={card}
                                lives={lives}
                                setLives={setLives}
                                key={card.id}
                                gamemodeSkins={gamemodeSkins}
                                difficulty={difficulty}
                                doneRenderingSkins={doneRenderingSkins}
                                easyWins={easyWins}
                                mediumWins={mediumWins}
                                hardWins={hardWins}
                                setEasyWins={setEasyWins}
                                setMediumWins={setMediumWins}
                                setHardWins={setHardWins}
                            />
                        );
                    })}
                </>
            ) : null}
        </div>
    );
}

export default CardsContainer;
