import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SeriesCard from "../components/SeriesCard";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

function SeriesList({ series, setSeries }) {
  const [pageNumber, setPageNumber] = useState(1);

  const showSeries = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/top_rated",
      params: { language: "en-US", page: `${pageNumber}` },
      headers: {
        accept: "application/json",
        Authorization: `${import.meta.env.VITE_API_KEY}`,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setSeries(response.data.results);
      })
      .catch((error) => {
        navigate("/Error")
        console.log(error);
      });
  };
const navigate = useNavigate()
  useEffect(() => {
    showSeries();
  }, [pageNumber]);

  const handleDecrease = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleIncrease = () => {
    if (pageNumber < 102) {
      setPageNumber(pageNumber + 1);
    }
  };

  if (series === null) {
    return (
      <div style={{ color: "#f1fa8c", backgroundColor: "#282a36	", padding:"100px 50%" }}>
        <Spinner
          animation="border"
          style={{width:"150px", height:"150px"}}
        />
        <h2>...Cargando...</h2>
      </div>
    );
  }

  return (
    <div key={series.id} className="series-list-container">
     <h1 style={{textAlign:"center", color:"white"}}>Series más Populares</h1>
      <div className="paginado">
        <Button onClick={handleDecrease} disabled={pageNumber === 1}>
          🢀
        </Button>
        <h5> Página: {pageNumber}</h5>
        <Button onClick={handleIncrease}>🢂</Button>
      </div>

      <div className="series-list">

        {series.map((serie) => {
          return (
            <Link to={`/series/${serie.id}`} key={serie.id}>
              <SeriesCard serie={serie} type={"seriesList"} />
            </Link>
          );
        })}
      </div>

      <div className="paginado">
        <Button onClick={handleDecrease} disabled={pageNumber === 1}>
          🢀
        </Button>
        <h5> Página: {pageNumber}</h5>
        <Button onClick={handleIncrease}>🢂</Button>
      </div>
    </div>
  );
}

export default SeriesList;
