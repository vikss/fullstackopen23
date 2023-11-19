import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {

   const [search, setSearch] = useState(null)
   const [countries, setCountries] = useState([])
   const [filtered, setFiltered] = useState([])

   const searchChange = (event) => {

      let value = event.target.value
      console.log(`Setting search string to ${search}`)
      setSearch(value)


   }
   useEffect(() => {
      if (search) {
         console.log(search)
         console.log(countries)
         let matched = countries.filter(country => {
            let name = country.name.common.toLowerCase()
            return name.includes(search.toLowerCase())

         })
         console.log("hi")
         let names = matched.map(country => country.name.common)
         setFiltered(matched)
         console.log(`Matched country names ${names}`)
         console.log(filtered)

      }
   }, [search])
   useEffect(() => {

      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(res => {

         console.log(res.data)

         setCountries(res.data)


      })



   }, [])


   return <div>

      <div>find countries <input onChange={searchChange}></input></div>

      {filtered.length == 1 && <div><h2>{filtered[0].name.common}</h2>
         <div className="capital">capital {filtered[0].capital.map(name => <div>{name}</div>)}</div>
         <div>area {filtered[0].area}</div>
         <div id="lang"><div id="langheading">languages:</div><ul> {Object.values(filtered[0].languages).map(lang => <li>{lang}</li>)}</ul></div>
         <div><img src={filtered[0].flags.png} height="160px" width="160px" /></div>
         <div className="heading"><div>Weather in {filtered[0].capital[0]}</div></div>



      </div>}

      {filtered.length > 1 && filtered.length <= 10 && <div class="clist">{filtered.map(country => {

         console.log(country)
         console.log(country.name.common)
         return <div>{country.name.common}<button onClick={(event) => { setSearch(country.name.common) }} value={country.name.common}>show</button></div>


      })}</div>}
      {filtered.length > 10 && <div>Too many matches, specify another filter</div>}


   </div>



}

export default App
