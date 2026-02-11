import { useState, useEffect } from 'react'
import '../styles/App.css'
import cardBack from '../assets/Your_Shop_Banner.webp'

async function getChampsJSON() {
  let champsNames;
  await fetch('https://ddragon.leagueoflegends.com/cdn/16.1.1/data/en_US/champion.json')
  .then(res => res.json())
  .then(data => data.data)
  .then(data => {
    // console.log(data)
    // console.log(randomChamp)
    // console.log(Object.keys(data));
    // console.log(Object.keys(data)[randomChamp])
    champsNames = Object.keys(data);
  });
  // console.log(champsNames);
  return champsNames;
}

function ChampionImage({champName}) {

  // useEffect(() => {
  //   const timeOut = setInterval(() => {
  //     getChampsJSON(setChampName);
  //   }, 3000)

  //   return () => {
  //     clearInterval(timeOut);
  //   }
  // }, [])
  let backFacing = true;
  return (
    <div className='card-container'  onClick={(e) => {
        if (backFacing) {
          backFacing = false;
          console.log()
          e.target.parentElement.classList.add('rotate');
        } else {
          backFacing = true;
          e.target.parentElement.classList.remove('rotate');
        }

      }}>
      <img className='card-back' src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`} />
      <img className='card' src={cardBack} />
    </div>
  )
}

function getChampionName(setCardArray) {
  getChampsJSON().then(data => {
        for (let i = 0; i < 10; i++) {
          const randomChamp = Math.floor(Math.random() * 172);
          setCardArray(prev => [...prev, data[randomChamp]]);
        }
      });
}

function App() {
  const [cardArray, setCardArray] = useState([]);

  let firstRun = true;
  useEffect(() => {
    if (firstRun) {
      firstRun = false;
      getChampionName(setCardArray);
    }
    return () => {
      setCardArray([]);
    }
  }, []);

  useEffect(() => {
    console.log(cardArray);
  }, [cardArray])
  return (
    <>
      <div className='cards-container'>
        {cardArray.map(card => {
          return <ChampionImage champName={card} key={card}/>  
        })}
        {cardArray.map(card => {
          return <ChampionImage champName={card} key={card}/>  
        })}
      </div>
      {/* <ChampionImage champName={cardArray[0]}/>
      <ChampionImage champName={cardArray[1]}/>
      <ChampionImage champName={cardArray[2]}/>
      <ChampionImage champName={cardArray[3]}/>
      <ChampionImage champName={cardArray[4]}/>
      <br />
      <ChampionImage champName={cardArray[5]}/>
      <ChampionImage champName={cardArray[6]}/>
      <ChampionImage champName={cardArray[7]}/>
      <ChampionImage champName={cardArray[8]}/>
      <ChampionImage champName={cardArray[9]}/> */}
    </>
  )
}

export default App
