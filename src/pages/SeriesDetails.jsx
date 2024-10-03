import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddToListForm from "../components/AddToListForm";
import { Button } from "react-bootstrap";
import Rating from "../components/Rating";

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
      <div className="series-details">
        <div className="back-btns">
          <Button
            onClick={() => navigate("/series")}
            variant="outline-danger"
          >
            Volver al listado
          </Button>
          <Button
            onClick={() => navigate("/mylist")}
            variant="outline-success"
          >
            Volver a mis series
          </Button>
        </div>

        <div className="details-main-info">
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
            alt="TV Show Image"
          />
          <div className="details-main-info-text">
            <div className="details-name-genres">
              <h1>{serie.name}</h1>
              <div className="details-main-info-genres">
                {serie.genres.map((genre) => {
                  return <h6 key={genre.name}>{genre.name}</h6>;
                })}
              </div>
            </div>
            
            {serieInWatchlist.length > 0 ? (
              <>
                <Rating>{serieInWatchlist[0].rating}</Rating>
                <p
                  style={{
                    textAlign: "center",
                    width: "120px",
                    padding: "10px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    backgroundColor:
                      serieInWatchlist[0].personalWatchlist === "wantToWatch"
                        ? "#50fa7b"
                        : serieInWatchlist[0].personalWatchlist === "watching"
                        ? "#f1fa8c"
                        : serieInWatchlist[0].personalWatchlist === "watched"
                        ? "	#ff5555"
                        : "",
                    color:
                      serieInWatchlist[0].personalWatchlist === "watching" ||
                      serieInWatchlist[0].personalWatchlist === "watched"
                        ? "black"
                        : "white",
                  }}
                >
                  {serieInWatchlist[0].personalWatchlist === "wantToWatch"
                    ? "Quiero Verla"
                    : serieInWatchlist[0].personalWatchlist === "watching"
                    ? "Viendo"
                    : serieInWatchlist[0].personalWatchlist === "watched"
                    ? "Vista"
                    : ""}
                </p>
              </>
            ) : null}
          </div>
        </div>
        <div className="details-general-info">
          <p><strong>Fecha del primer episodio:</strong> {serie.first_air_date}</p>

          {serie.next_episode_to_air === null ? (
            <p><strong>Fecha del final:</strong> {serie.last_air_date}</p>
          ) : (
            <p><strong>Serie en emisión</strong></p>
          )}

          <p><strong>Fecha del último episodio:</strong> {serie.last_air_date}</p>
          <p><strong>Número de episodios:</strong> {serie.number_of_episodes}</p>
          <p><strong>Número de temporadas:</strong> {serie.number_of_seasons}</p>
          <p><strong>Idioma original:</strong> {serie.original_language}</p>
          <p><strong>
            Pagina original serie:</strong> <a href={serie.homepage}>{serie.homepage}</a>{" "}
          </p>

          <p>{serie.overview}</p>
        </div>
        {serieInWatchlist.length === 0 ? (
          <div className="add-to-list-form">
            <AddToListForm
              name={serie.name}
              image={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
              id={serie.id}
              genres={serie.genres}
              setSerieInWatchlist={setSerieInWatchlist}
              type={"add"}
            />
          </div>
        ) : (
          <div className="add-to-list-form">
            <Button
              style={{
                backgroundColor: "	#ff5555",
                color: "#282a36",
                fontWeight: "bold",
                border: "none",
              }}
              onClick={handleDelete}
            >
              {" "}
              Borrar de mi lista
            </Button>
            <AddToListForm
              name={serie.name}
              image={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
              id={serie.id}
              serieInWatchlist={serieInWatchlist}
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
