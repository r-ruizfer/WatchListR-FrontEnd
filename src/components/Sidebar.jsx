import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Sidebar({ type }) {

  if (type === "seriesList") {

    const [genres, setGenres] = useState(null)

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/tv/list',
      params: {language: 'en'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjRiOGNiZmZhOTM0YTUzMDgyOTJjYjcxODY3NjI4YyIsIm5iZiI6MTcyNzQzNTYyNy45NDEyMzIsInN1YiI6IjY2ZjY5MjllZTBiZjdhYzI4NTk2NmVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gmx5VB8Yp0j_Lv1Bzry-yDc8h1mtDyF4EafTrceidew'
      }
    };

    useEffect(() => {
      axios
      .request(options)
      .then((response) => {
        console.log(response.data.genres);
        setGenres(response.data.genres)
      })
      .catch((error) => {
        console.log(error);
      });
    }, [])

    if (genres === null) {
      return <h1>...cargando</h1>
    }

    return (
      <div>
        {genres && genres.map((genre) => {
          return (
            <div key={genre.id}>
              <h5>{genre.name}</h5>
            </div>
          
          )
        })}
      </div>
    )

  } else if (type === "seriesDetails") {

    return (
      <Link to="/series">
        Volver al listado
      </Link>
    )
  }
  
}

export default Sidebar