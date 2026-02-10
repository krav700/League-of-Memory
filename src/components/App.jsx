import { useState, useEffect } from 'react'
import '../styles/App.css'

async function getChampsJSON(setChampName) {
  const randomChamp = Math.floor(Math.random() * 172);
  const champJSON = await fetch('https://ddragon.leagueoflegends.com/cdn/16.1.1/data/en_US/champion.json')
  .then(res => res.json())
  .then(data => data.data)
  .then(data => {
    console.log(data)
    console.log(randomChamp)
    console.log(Object.keys(data));
    console.log(Object.keys(data)[randomChamp])
    setChampName(Object.keys(data)[randomChamp]);
  });
}

function ChampionImage() {
  const [champName, setChampName] = useState('');

  useEffect(() => {
    let firstRun = true;
    if (firstRun) {
      firstRun = false;
      getChampsJSON(setChampName);
    }
  }, [])

  // useEffect(() => {
  //   const timeOut = setInterval(() => {
  //     getChampsJSON(setChampName);
  //   }, 3000)

  //   return () => {
  //     clearInterval(timeOut);
  //   }
  // }, [])

  return (
    <>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`} />
    </>
  )
}

function App() {

  return (
    <>
      <ChampionImage />
      <ChampionImage />
      <ChampionImage />
      <ChampionImage />
      <ChampionImage />
      <br />
      <ChampionImage />
      <ChampionImage />
      <ChampionImage />
      <ChampionImage />
      <ChampionImage />
    </>
  )
}

export default App
