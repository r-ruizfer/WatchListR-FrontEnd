import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SeriesCard from "../components/SeriesCard";
import Button from 'react-bootstrap/Button';
function SeriesList({
  searchValue,
  setSearchValue,
  filterValue,
  setFilterValue,
}) {
  const [series, setSeries] = useState(null);
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
        console.log(error);
      });
  };

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
    return <h1>...cargando</h1>;
  }

  return (
    <div key={series.id} className="series-list-container">
      <div className="paginado">
        <Button
          variant="secondary"
          onClick={handleDecrease}
          disabled={pageNumber === 1}
        >
          Página anterior
        </Button>{" "}
        <h3>{pageNumber}</h3>
        <Button variant="secondary" onClick={handleIncrease}>
          Página siguiente
        </Button>{" "}
      </div>

      <div className="sidebar-body">
        <div className="series-list">
          {series.map((serie) => {
            return (
              <Link to={`/series/${serie.id}`} key={serie.id}>
                <SeriesCard serie={serie} type={"seriesList"} />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="paginado">
        <button
          className="boton-paginado"
          onClick={handleDecrease}
          disabled={pageNumber === 1}
        >
          Página anterior
        </button>
        <h3>{pageNumber}</h3>
        <button className="boton-paginado" onClick={handleIncrease}>
          Página siguiente
        </button>
      </div>
    </div>
  );
}

export default SeriesList;
