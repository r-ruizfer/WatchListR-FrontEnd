import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SeriesCard from "../components/SeriesCard";
import axios from "axios";
import { Spinner, Button } from "react-bootstrap";

function SearchResults({
  searchValue,
  setSearchValue,
  filterValue,
  setFilterValue,
}) {
  const params = useParams();
  const [searchResults, setSearchResults] = useState(null);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/tv",
    params: {
      query: `${params.query}`,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization: `${import.meta.env.VITE_API_KEY}`,
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setSearchResults(response.data.results);
        setSearchValue("");
      })
      .catch(function (error) {
        navigate("/Error");
        console.error(error);
      });
  }, []);

  if (searchResults === null) {
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

  if (!searchResults || searchResults.length === 0) {
    return (
      <div>
        <h3
          style={{
            backgroundColor: "#282a36",
            color: "white",
            padding: "50px 40%",
            textAlign: "left",
            margin:"0"
          }}
        >
          Series no Encontradas :(
        </h3>
        <div className="homepage-btns" style={{backgroundColor:"#282a36", alignItems:"center"}}>
          <Button
            style={{ backgroundColor: "#50fa7b", color: "black",height:"min-content", width:"300px" }}
            onClick={() => navigate("/series")}
          >
            <h4>Listado de series</h4>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "#282a36",
          color: "#f8f8f2	",
          margin: "0",
          paddingTop: "20px",
        }}
      >
        Resultados de Busqueda
      </h1>
      <div className="search-list">
        {searchResults
          .filter((serie) => {
            if (!filterValue) {
              return true;
            } else {
              return serie.genre_ids.includes(Number(filterValue));
            }
          })
          .map((serie) => {
            return (
              <Link to={`/series/${serie.id}`} key={serie.id}>
                <SeriesCard serie={serie} type={"seriesList"} />
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default SearchResults;
