import { React, useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ handleSearch }) => (
  <div>find countries <input onChange={handleSearch} /></div>

)

const Weather = ({ country }) => {

  const api_key = process.env.REACT_APP_API_KEY
  const params = {
    access_key: api_key,
    query: country.capital
  }
  console.log(api_key)
  const [weather, setWeather] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
        console.log(response.data)
      })
  }, [])

  if (weather !== "") {
    return (
      <div>
        <img src={weather.current.weather_icons[0]} width={60} alt="flag" />
        <br />
    temperature {weather.current.temperature}
        <br />
    wind {weather.current.wind_speed} mph, direction {weather.current.wind_dir}
      </div>
    )
  }
  else return (
    <div></div>
  )
}

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>

    <h2>Languages</h2>
    <ul>
      {country.languages.map(language =>
        <li key={language.name}>
          {language.name}
        </li>
      )}
    </ul>
    <img src={country.flag} width={200} alt="flag" />

    <h2>Weather in {country.capital}</h2>
    <Weather country={country} />
  </div>
)



const Countries = ({ listCountries, search, setSearch }) => {

  const handleClick = (country) => {
    setSearch(country.name)

  }

  if (listCountries.length === 1 && listCountries[0] != -1) {
    const country = listCountries[0]
    return (
      <Country country={country} />
    )
  }

  else if (listCountries[0] === -1) {
    return (
      "No matches, specify another filter")
  }

  else if (listCountries.length === 0 && search.length > 0) {
    return ("Too many matches, specify another filter")
  }
  else {
    return (
      <ul>
        {listCountries.map(country =>
          <li key={country.name}>
            {country.name} <button onClick={() => handleClick(country)}>show</button>
          </li>
        )}
      </ul>)
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')



  const countriesToShow = (props) => {
    const countries = props
    if (countries.length > 10) {
      return ([])
    }
    if (countries.length === 0) {
      console.log("BBBB")
      return ([-1])
    } else {
      return countries
    }
  }

  const listCountries = !search
    ? []
    : countriesToShow(countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()) === true))



  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <Filter handleSearch={handleSearch} />
      <Countries listCountries={listCountries} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App