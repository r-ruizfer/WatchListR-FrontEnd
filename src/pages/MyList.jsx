import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Sidebar from "../components/Sidebar"
import Search from "../components/Search"
import SeriesCard from "../components/SeriesCard"

function MyList() {

  const [series, setSeries] = useState(null)
  const [ searchValue, setSearchValue ] = useState("")

  

  

  useEffect(() => {
    axios.get("http://localhost:5000/personalWatchlist")
    
    .then((response) => {
      setSeries(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  
  if (series === null) {
    return <h1>...cargando</h1>
  }

  return (
    <div className="series-list-container">
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="sidebar-body">
        <Sidebar type={"seriesList"}/>
    
        <div  className="series-list">
          {series
          .filter((serie) => serie.name.toLowerCase().includes(searchValue))
          .map((serie) => {
            

            return (
            
              <SeriesCard key={serie.id} serie={serie} type={"myList"} />
            
            )
          })}
        </div>
      </div>
      

      
    </div>
  )
}

export default MyList