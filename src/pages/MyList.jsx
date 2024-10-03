import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import SeriesCard from "../components/SeriesCard";

function MyList({ searchValue, filterValue, setFilterValue }) {
  const [series, setSeries] = useState(null);
  const [watchlistFilter, setWatchlistFilter] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/personalWatchlist`)

      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (series === null) {
    return <h1>...cargando</h1>;
  }

  return (
    <div className="series-list-container">
      <div className="sidebar-body">
        <Sidebar
          type={"myList"}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          watchlistFilter={watchlistFilter}
          setWatchlistFilter={setWatchlistFilter}
        />

        <div className="series-list-filter">
          {!watchlistFilter ? (
            <p>Viendo todas las listas</p>
          ) : (
            <p>
              Filtrando por lista:{" "}
              {watchlistFilter === "wantToWatch"
                ? "Quiero Verla"
                : watchlistFilter === "watching"
                ? "Viendo"
                : watchlistFilter === "watched"
                ? "Vista"
                : ""}
            </p>
          )}

          {!filterValue ? (
            <p>Viendo todos los géneros</p>
          ) : (
            <p>
              Filtrando por género: {filterValue}
            </p>
          )}

          <div className="series-list">
            {series
              .filter((serie) => {
                if (!watchlistFilter) {
                  return true;
                } else {
                  return serie.personalWatchlist === watchlistFilter;
                }
              })
              .filter((serie) => {
                if (!filterValue) {
                  return true;
                } else {
                  return serie.genres.some(
                    (genre) => genre.name === filterValue
                  );
                }
              })
              .filter((serie) => serie.name.toLowerCase().includes(searchValue))
              .map((serie) => {
                return (
                  <SeriesCard key={serie.id} serie={serie} type={"myList"} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyList;
