import { useState, useEffect } from 'react'
import '../styles/App.css'

async function getChampsJSON(setChampName) {
  const randomChamp = Math.floor(Math.random() * 172);
  const champJSON = await fetch('https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json')
  .then(res => res.json())
  .then(data => data.data)
  .then(data => {
    setChampName(Object.keys(data)[randomChamp]);
  });
}

function App() {
  const [champName, setChampName] = useState('');

  useEffect(() => {
    let firstRun = true;
    if (firstRun) {
      firstRun = false;
      getChampsJSON(setChampName);
    }
  }, [])

  useEffect(() => {
    const timeOut = setInterval(() => {
      getChampsJSON(setChampName);
    }, 3000)

    return () => {
      clearInterval(timeOut);
    }
  }, [])

  return (
    <>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`} />
    </>
  )
}

export default App
