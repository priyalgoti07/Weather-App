import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('surat')

  useEffect(() => {
    handleSearchLoc()
  }, [])

  const handleSearchLoc = () => {
    console.log("inputValue", inputValue);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=7cc91aa987c87a7767a1ea83739a4729`)
      .then((res) => res.json())
      .then((data) => console.log("data", data))
  }
  return (
    <div>
      <div className=''>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleSearchLoc}>Search Loacation</button>
      </div>

    </div>
  )
}

export default App
