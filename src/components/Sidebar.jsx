import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Sidebar({
  setFilterValue,
  setWatchlistFilter,
  handleCloseSidebar
}) {
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
        <div className="sidebar-list">
          <h5>Filtrar por lista:</h5>
          <ButtonGroup vertical>
            <Button
              style={{ backgroundColor: "	#bd93f9", color: "#282a36", border: "none"}}
              value=""
              onClick={handleWatchlistFilter}
            >
              Todas las listas
            </Button>
            <Button
              style={{ backgroundColor: "	#50fa7b", color: "#282a36", border: "none"}}
              value="wantToWatch"
              onClick={handleWatchlistFilter}
            >
              Quiero Verla
            </Button>
            <Button
              style={{ backgroundColor: "	#f1fa8c", color: "#282a36", border: "none"}}
              value="watching"
              onClick={handleWatchlistFilter}
            >
              Viendo
            </Button>
            <Button
              style={{ backgroundColor: "	#ff5555", color: "#282a36", border: "none"}}
              value="watched"
              onClick={handleWatchlistFilter}
            >
              Vista
            </Button>
          </ButtonGroup>
        </div>
        <div className="sidebar-list">
          <h5>Filtrar por genero:</h5>
          <Button
            variant="outline-danger"
            value=""
            onClick={handleFilter}
          >
            <h6>Todos los géneros</h6>
          </Button>
          <ButtonGroup vertical className="sidebar-list-btns">
            {genres &&
              genres.map((genre) => {
                return (
                  <div key={genre.id}>
                    <Button
                      style={{ display: "block" }}
                      variant="outline-light"
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

export default Sidebar;
