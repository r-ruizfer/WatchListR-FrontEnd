import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SeriesCard({ serie, type }) {
  
 

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
            </div>
          </div>
        </Link>
       
      </div>
    );
  }
}

export default SeriesCard;
