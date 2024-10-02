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
      Authorization: `${import.meta.env.VITE_API_KEY}`,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setSerie(response.data);
        return axios.get(
          `http://localhost:5000/personalWatchlist?id=${response.data.id}`
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
    axios
      .delete(`http://localhost:5000/personalWatchlist/${serie.id}`)
      .then(navigate("/mylist"));
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

        {serieInWatchlist.length > 0 ? (
          <div>
            <p>Rating: {serieInWatchlist[0].rating}</p>
            <p>
              Estado:{" "}
              {serieInWatchlist[0].personalWatchlist === "wantToWatch"
                ? "Quiero Verla"
                : serieInWatchlist[0].personalWatchlist === "watching"
                ? "Viendo"
                : serieInWatchlist[0].personalWatchlist === "watched"
                ? "Vista"
                : ""}
            </p>
          </div>
        ) : null}

        <p>{serie.overview}</p>
        {serieInWatchlist.length === 0 ? (
          <AddToListForm
            name={serie.name}
            image={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
            id={serie.id}
            genres={serie.genres}
            setSerieInWatchlist={setSerieInWatchlist}
            type={"add"}
          />
        ) : (
          <div>
            <button onClick={handleDelete}> Borrar de mi lista</button>
            <AddToListForm
              name={serie.name}
              image={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
              id={serie.id}
              setSerieInWatchlist={setSerieInWatchlist}
              type={"update"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SeriesDetails;
