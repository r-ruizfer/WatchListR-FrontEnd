import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function SeriesCard({ serie, type }) {
  const navigate = useNavigate();

  let estadoWatchlist;

  if (serie.personalWatchlist === "wantToWatch") {
    estadoWatchlist = "Quiero verla";
  } else if (serie.personalWatchlist === "watching") {
    estadoWatchlist = "Viendo";
  } else if (serie.personalWatchlist === "watched") {
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
              <h5> {serie.name} </h5>
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
          <Card.Title>{serie.name}</Card.Title>
          <Card.Text>
            <p> Rating: {serie.rating}</p>
            <p>{estadoWatchlist}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default SeriesCard;
