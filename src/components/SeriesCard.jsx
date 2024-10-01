import { Link } from "react-router-dom";

function SeriesCard({ serie, type }) {

  let estadoWatchlist

  if (serie.personalWatchlist === "wantToWatch") {
    estadoWatchlist = "Quiero verla"
  } else if (serie.personalWatchlist === "watching") {
    estadoWatchlist = "Viendo"
  } else if (serie.personalWatchlist === "watched") {
    estadoWatchlist = "Vista"
  }

  if (type === "seriesList") {
    return (
      <div className="series-card">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
          alt="Imagen"
        />

        <h3>{serie.name}</h3>
      </div>
    );
  } else if (type === "myList") {
    return (
      <div className="series-card">
        <Link to={`/series/${serie.id}`} key={serie.id}>
          <div>
            <div>
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
                alt="Imagen"
              />

              <h3>{serie.name}</h3>
              <p> Rating: {serie.rating}</p>
              <p>{estadoWatchlist}</p>
            </div>
          </div>
        </Link>
       
      </div>
    );
  }
}

export default SeriesCard;
