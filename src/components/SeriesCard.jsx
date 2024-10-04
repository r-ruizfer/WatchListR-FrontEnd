import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";

function SeriesCard({ serie, type }) {
  const navigate = useNavigate();

  let estadoWatchlist;

  if (serie.status === "wantToWatch") {
    estadoWatchlist = "Quiero verla";
  } else if (serie.status === "watching") {
    estadoWatchlist = "Viendo";
  } else if (serie.status === "watched") {
    estadoWatchlist = "Vista";
  }

  if (type === "seriesList") {
    return (
      <Link to={`/series/${serie.id}`} key={serie.id}>
        <Card className="series-card">
          <Card.Img
            variant="top"
            src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
          />
          <Card.Body>
          <Card.Title>
            <h4>{serie.name}</h4>
          </Card.Title>
        </Card.Body>
        </Card>
      </Link>
    );
  } else if (type === "myList") {
    return (
      <Card
        onClick={() => navigate(`/series/${serie.id}`)}
        
        className="series-card"
      >
        <Card.Img
          variant="top"
          src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`}
        />
        <Card.Body>
          <Card.Title>
            <h4>{serie.name}</h4>
          </Card.Title>
          <Card.Text>
            <Rating>{serie.rating}</Rating>
            <p style={{margin: "0"}}>{estadoWatchlist}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default SeriesCard;
