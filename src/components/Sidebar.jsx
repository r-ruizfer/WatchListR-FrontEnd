import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Sidebar({
  type,
  setFilterValue,
  setWatchlistFilter,
  handleCloseSidebar
}) {
  const navigate = useNavigate();

  if (type === "seriesDetails") {
    return (
      <div className="sidebar">
        <div className="sidebar-list">
          <Button
            onClick={() => navigate("/series")}
            style={{
              backgroundColor: "	#50fa7b",
              color: "#282a36",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Volver al listado
          </Button>
          <Button
            onClick={() => navigate("/mylist")}
            style={{
              backgroundColor: "	#8be9fd",
              color: "#282a36",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Volver a mis series
          </Button>
        </div>
      </div>
    );
  } else if (type === "myList") {
    const [genres, setGenres] = useState(null);

    const handleWatchlistFilter = (event) => {
      setWatchlistFilter(event.target.value);
      handleCloseSidebar()
    };

    const handleFilter = (event) => {
      setFilterValue(event.target.value);
      handleCloseSidebar()
    };

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/tv/list",
      params: { language: "en" },
      headers: {
        accept: "application/json",
        Authorization: `${import.meta.env.VITE_API_KEY}`,
      },
    };

    useEffect(() => {
      axios
        .request(options)
        .then((response) => {
          setGenres(response.data.genres);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    if (genres === null) {
      return <h1>...cargando</h1>;
    }

    return (
      <div className="sidebar">
        <div className="sidebar-list-watchlists">
          <h4>Filtrar por lista:</h4>
          <ButtonGroup vertical>
            <Button
              style={{ backgroundColor: "	#bd93f9", color: "#282a36", border: "none"}}
              size="lg"
              value=""
              onClick={handleWatchlistFilter}
            >
              Todas las listas
            </Button>
            <Button
              style={{ backgroundColor: "	#50fa7b", color: "#282a36", border: "none"}}
              size="lg"
              value="wantToWatch"
              onClick={handleWatchlistFilter}
            >
              Quiero Verla
            </Button>
            <Button
              style={{ backgroundColor: "	#f1fa8c", color: "#282a36", border: "none"}}
              size="lg"
              value="watching"
              onClick={handleWatchlistFilter}
            >
              Viendo
            </Button>
            <Button
              style={{ backgroundColor: "	#ff5555", color: "#282a36", border: "none"}}
              size="lg"
              value="watched"
              onClick={handleWatchlistFilter}
            >
              Vista
            </Button>
          </ButtonGroup>
        </div>
        <div className="sidebar-list">
          <h4>Filtrar por genero:</h4>
          <Button
            size="lg"
            variant="outline-danger"
            value=""
            onClick={handleFilter}
          >
            Todos los géneros
          </Button>
          <ButtonGroup vertical className="sidebar-list-btns">
            {genres &&
              genres.map((genre) => {
                return (
                  <div key={genre.id}>
                    <Button
                      style={{ display: "block" }}
                      variant="outline-light"
                      size="lg"
                      value={genre.name}
                      onClick={handleFilter}
                    >
                      {genre.name}
                    </Button>
                  </div>
                );
              })}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default Sidebar;
