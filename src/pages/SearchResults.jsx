import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SeriesCard from "../components/SeriesCard";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function SearchResults({
  searchValue,
  setSearchValue,
  filterValue,
  setFilterValue,
}) {
  const [searchResults, setSearchResults] = useState(null);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/tv",
    params: {
      query: `${searchValue}`,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization: `${import.meta.env.VITE_API_KEY}`,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSearchResults(response.data.results);
        console.log(searchResults);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchValue]);

  if (searchResults === null) {
    <h3>...cargando</h3>;
  }

  if (!searchResults || searchResults.length === 0) {
    return <h3>No results found</h3>;
  }

  return (
    <div className="series-list">
      <Sidebar
        type="seriesList"
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
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
  );
}

export default SearchResults;
