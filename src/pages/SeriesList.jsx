import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Sidebar from "../components/Sidebar"
import Search from "../components/Search"
import SeriesCard from "../components/SeriesCard"

function SeriesList() {

  const [series, setSeries] = useState(null)
  const [ searchValue, setSearchValue ] = useState("")

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/tv/top_rated',
    params: {language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjRiOGNiZmZhOTM0YTUzMDgyOTJjYjcxODY3NjI4YyIsIm5iZiI6MTcyNzQzNTYyNy45NDEyMzIsInN1YiI6IjY2ZjY5MjllZTBiZjdhYzI4NTk2NmVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gmx5VB8Yp0j_Lv1Bzry-yDc8h1mtDyF4EafTrceidew'
    }
  };

  useEffect(() => {
    axios
    .request(options)
    .then((response) => {
      setSeries(response.data.results)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  
  if (series === null) {
    return <h1>...cargando</h1>
  }

  return (
    <div key={series.id} className="series-list-container">
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="sidebar-body">
        <Sidebar type={"seriesList"}/>
    
        <div className="series-list">
          {series
          .filter((serie) => serie.name.toLowerCase().includes(searchValue))
          .map((serie) => {
            return (
            <Link to={`/series/${serie.id}`} key={serie.id}>
              <SeriesCard serie={serie} type={"seriesList"} />
            </Link>
            )
          })}
        </div>
      </div>
      

      
    </div>
  )
}

export default SeriesList