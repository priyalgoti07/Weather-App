import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ApiKey } from './APIKEY'
import feellike from './assets/svg/feellike.svg'
import Humidity from './assets/svg/humidity.svg'
import Rain from './assets/svg/rain.svg'
import Speed from './assets/svg/speed.svg'
import Cloud from './assets/svg/cloud.svg'

function App() {
  const [inputValue, setInputValue] = useState('surat')
  const [weatherData, setWeatherData] = useState({})
  const CurrentDate = new Date().toLocaleString()

  useEffect(() => {
    handleSearchLoc()
  }, [])

  const handleSearchLoc = async () => {
    if (inputValue !== "" && isNaN(Number(inputValue)) && inputValue) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${ApiKey}`);
        if (!response.ok) {
          const errorMessage = await response.json();
          setWeatherData(errorMessage)
          throw new Error(`city not found`);
        }
        const data = await response.json();
        setWeatherData(data)
      } catch (error) {
        alert(error)
      }
    }
    else {
      alert('Please Enter Valid City & Country')
    }

  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") handleSearchLoc()
  }
  return (
    <div className={`main-container ${(Math.round(weatherData?.main?.temp - 273.15) < 0)
      ? 'Coldest-container' : (weatherData?.clouds?.all > 90)
        ? 'rain-container' : 'normal-containe'}`}>
      <div className='w-full mx-auto flex justify-between py-20' style={{ maxWidth: '1700px' }}>
        <div className='flex flex-col items-start gap-4'>
          <h1 className='font-medium text-5xl py-4 capitalize'>{weatherData?.weather?.[0].description}</h1>
          <p className='font-semibold'>{`${weatherData?.name}, ${weatherData?.sys?.country}`}</p>
          <p className='text-base'>{CurrentDate}</p>
          <h1 className='font-normal text-4xl py-4'>{Math.round(weatherData?.main?.temp - 273.15)} &deg;C</h1>
          <img src={Cloud} className="h-20" />
          <div className='flex bor'>
            <input type='text'
              className=' focus:outline-none border-b-2 border-white bg-transparent'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyUp(e)}
              placeholder='Enter Location...' />
            <button onClick={handleSearchLoc}>Search Loacation</button>
          </div>
        </div>

        <div>
          <div className='flex gap-2 py-4'>
            <img src={feellike} className='h-10 my-5 mx-2' alt='key' />
            <div className='font-semibold'>
              <p className='my-2'>Feels Like</p>
              <p className='text-2xl'>{Math.round(weatherData?.main?.feels_like - 273.15)} &deg;C</p>
            </div>
          </div>
          <div className='flex gap-2 py-4'>
            <img src={Humidity} className='h-10 my-5 mx-2' alt='key' />
            <div className='font-semibold'>
              <p className='my-2'>Humidity</p>
              <p className="text-2xl">{weatherData?.main?.humidity + ' %'}</p>
            </div>
          </div>
          <div className='flex gap-2 py-4'>
            <img src={Rain} className='h-10 my-5 mx-2' alt='key' />
            <div className='font-semibold'>
              <p className='my-2'>Chance of Rain</p>
              <p className='text-2xl'>{weatherData?.clouds?.all + ' %'}</p>
            </div>
          </div>
          <div className='flex gap-2 py-4'>
            <img src={Speed} className='h-10 my-5 mx-2' alt='key' />
            <div className='font-semibold'>
              <p className='my-2'>Wind Speed</p>
              <p className='text-2xl'>{Math.round(weatherData?.wind?.speed * 1.60934) + ' Km/Hr'} &deg;C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
