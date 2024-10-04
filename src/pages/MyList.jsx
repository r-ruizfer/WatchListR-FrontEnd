import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import SeriesCard from "../components/SeriesCard";
import { Button, Offcanvas, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyList({ filterValue, setFilterValue }) {
  const [series, setSeries] = useState(null);
  const [watchlistFilter, setWatchlistFilter] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/personalWatchlists`)
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        navigate("/Error");
        console.log(error);
      });
  }, []);

  if (series === null) {
    return (
      <div
        style={{
          color: "#f1fa8c",
          backgroundColor: "#282a36	",
          padding: "100px 50%",
        }}
      >
        <Spinner
          animation="border"
          style={{ width: "150px", height: "150px" }}
        />
        <h2>...Cargando...</h2>
      </div>
    );
  }

  const filteredSeries = series
    .filter((serie) => {
      if (!watchlistFilter) {
        return true;
      } else {
        return serie.status === watchlistFilter;
      }
    })
    .filter((serie) => {
      if (!filterValue) {
        return true;
      } else {
        return serie.genres.some((genre) => genre.name === filterValue);
      }
    });

  return (
    <div className="mylist-container">
      <Button
        style={{
          backgroundColor: "#bd93f9",
          color: "black",
          border: "none",
          fontWeight: "bold",
          margin: "10px",
          height: "min-content",
          position: "absolute",
        }}
        onClick={handleShowSidebar}
        className="d-lg-none mb-3"
      >
        Mostrar Filtros
      </Button>

      <Offcanvas
        show={showSidebar}
        onHide={handleCloseSidebar}
        className="d-lg-none"
      >
        <Offcanvas.Header
          closeButton
          style={{ backgroundColor: "#44475a", color: "white" }}
        >
          <Offcanvas.Title>Filtrar Series</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: "#44475a" }}>
          <Sidebar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            watchlistFilter={watchlistFilter}
            setWatchlistFilter={setWatchlistFilter}
            handleCloseSidebar={handleCloseSidebar}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <div className="sidebar-body d-none d-lg-block">
        <Sidebar
          type={"myList"}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          watchlistFilter={watchlistFilter}
          setWatchlistFilter={setWatchlistFilter}
        />
      </div>

      <div className="series-list-filter">
        <h1 style={{ textAlign: "center" }}>Mis Listas</h1>
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
          <p>Filtrando por género: {filterValue}</p>
        )}

        <div className="series-list">
          {filteredSeries.length === 0 ? (
            <div>
              <h3 style={{ paddingTop: "50px",paddingBottom: "50px" }}>No hay series en tu lista</h3>
              <div className="homepage-btns">
                <Button
                  style={{ backgroundColor: "#50fa7b", color: "black" }}
                  onClick={() => navigate("/series")}
                >
                  <h1>Listado de series</h1>
                </Button>
              </div>
            </div>
          ) : (
            filteredSeries.map((serie) => (
              <SeriesCard key={serie.id} serie={serie} type={"myList"} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyList;
