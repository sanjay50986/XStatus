import React, { useEffect, useState } from 'react'

const App = () => {

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [city, setCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectStatus, setSelectStatus] = useState("")
  const [selectCity, setSelectCity] = useState("")

  async function fetchCountry() {
    try {
      const res = await fetch("https://location-selector.labs.crio.do/countries")
      const data = await res.json()
      setCountries(data)
    } catch (error) {
      console.error("something wrong:", error)
    }
  }


  
  async function fetchStatus() {
    try {
      const res = await fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/states`)
      const data = await res.json()
      setStates(data)
    } catch (error) {
      console.error("something wrong:", error)
    }
  }


  async function fetchCity() {
    try {
      const res = await fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectStatus}/cities`)
      const data = await res.json()
      setCity(data)
    } catch (error) {
      console.error("something wrong:", error)
    }
  }


  useEffect(() => {
    fetchCountry()
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [selectedCountry])

  useEffect(() => {
    fetchCity()
  }, [selectStatus])
  
  
  

  return (
    <div style={{
      textAlign: "center"
    }}>
      <h1>Select Location</h1>

      <div style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <select style={{
          height:"40px",
          width: "250px"
        }}
        onChange={(e) => setSelectedCountry(e.target.value)} 
        >
          <option value="" disabled selected>
            Select Country
          </option>

          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>

        <select style={{
          height:"40px",
        }}
         onChange={(e) => setSelectStatus(e.target.value)} 
        disabled={!selectedCountry}
        >
          <option value="" disabled selected>
            Select Country
          </option>
          {states.map((states, index) => (
            <option key={index} value={states}>{states}</option>
          ))}
        </select>

        <select style={{
          height:"40px",
        }}
        disabled={!selectStatus}
        onChange={(e) => setSelectCity(e.target.value)}
        >
          <option value="" disabled selected>
            Select City
          </option>
           {city.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {selectCity && (
        <h2>You Selected {selectCity}, {selectStatus}, {selectedCountry}</h2>
      )}

    </div>
  )
}

export default App