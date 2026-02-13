import { useState, useEffect } from "react";
import "../styles/App.css";
import cardBack from "../assets/Your_Shop_Banner.webp";

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

function getChampionNames(setNameArray) {
    getChampsJSON().then((data) => {
        setNameArray(data);
    });
    return true;
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
            {id: prev.length, name: nameArray[randomChamp] },
        ]);
    }
    setCardArray((prev) => [
      ...prev,
      ...prev.map(card => ({
        ...card,
        id: crypto.randomUUID()
      }))
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
  if (hasRan) {
    setCardArray(copyArray);
    setHasRan(false)
  }
}

function App() {
    const [nameArray, setNameArray] = useState([]);
    const [cardArray, setCardArray] = useState([{id: 0, name: "" }]);

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
        fillArrayWithChamps(20, setCardArray, nameArray);

        return () => {
            setCardArray([]);
        };
    }, [nameArray]);

    return (
        <>
            <div className="cards-container">
                {cardArray.length > 0 ? 
                <>
                {
                  randomizeChampArray(cardArray, setCardArray)
                }
                {
                  cardArray.map((card) => {
                    return <ChampionImage champ={card} key={card.id} />;
                  })
                }
                </>
                : null }
            </div>
        </>
    );
}

export default App;

//TODO make it so it cannot give the same champ twice,
// lives, difficulty, champs/skins/items options, style
