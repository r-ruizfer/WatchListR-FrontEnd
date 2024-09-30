import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AddToListForm from "../components/AddToListForm";

function SeriesDetails() {
  const params = useParams();
  const [serie, setSerie] = useState(null);
  const [serieInWatchlist, setSerieInWatchlist] = useState(false);
  const navigate = useNavigate();
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/tv/${params.seriesId}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjRiOGNiZmZhOTM0YTUzMDgyOTJjYjcxODY3NjI4YyIsIm5iZiI6MTcyNzQzNTYyNy45NDEyMzIsInN1YiI6IjY2ZjY5MjllZTBiZjdhYzI4NTk2NmVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gmx5VB8Yp0j_Lv1Bzry-yDc8h1mtDyF4EafTrceidew",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setSerie(response.data);
        return axios.get(
          `http://localhost:5000/personalWatchlist?serieApiId=${response.data.id}`
        );
      })
      .then((response) => {
        setSerieInWatchlist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleDelete() {
    axios.get(`http://localhost:5000/personalWatchlist/${serie.id}`)
      .then((response)=>{
        console.log(response)
      })
    //axios.delete(`http://localhost:5000/personalWatchlist/${.id}}`)
  }

  if (serie === null) {
    return <h3>...cargando</h3>;
  }

  return (
    <div className="sidebar-body">
      <Sidebar type={"seriesDetails"} />

      <div>
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
          alt="TV Show Image"
        />
        <h1>{serie.name}</h1>
        {serie.genres.map((genre) => {
          return <h5 key={genre.name}>{genre.name}</h5>;
        })}
        <p>Fecha del primer episodio: {serie.first_air_date}</p>

        {serie.next_episode_to_air === null ? (
          <p>Fecha del final: {serie.last_air_date}</p>
        ) : (
          <p>Serie en emisión</p>
        )}

        <p>Fecha del último episodio: {serie.last_air_date}</p>
        <p>Número de episodios: {serie.number_of_episodes}</p>
        <p>Número de temporadas: {serie.number_of_seasons}</p>
        <p>Idioma original: {serie.original_language}</p>
        <p>{serie.overview}</p>
        {serieInWatchlist.length === 0 ? (
          <AddToListForm
            name={serie.name}
            image={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
            id={serie.id}
            setSerieInWatchlist={setSerieInWatchlist}
          />
        ) : (
          <div>
            <button onClick={handleDelete}> Borrar de mi lista</button>
            <button>Actualizar Estado</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeriesDetails;
