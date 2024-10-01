import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom"
import SeriesCard from '../components/SeriesCard';
import axios from 'axios';

function SearchResults({ searchValue, setSearchValue }) {

  const [ searchResults, setSearchResults ] = useState(null)

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/tv',
    params: {query: `${searchValue}`, include_adult: 'false', language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization:  `${import.meta.env.VITE_API_KEY}`
    }
  };

  useEffect(() => {
    axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      setSearchResults(response.data.results)
      console.log(searchResults);
    })
    .catch(function (error) {
      console.error(error);
    });
  }, [searchValue])

  if (searchResults === null) {
    <h3>...cargando</h3>
  }

  if (!searchResults || searchResults.length === 0) {
    return <h3>No results found</h3>;
  }

  return (
    <div className="series-list">
      {searchResults.map((serie) => {
          return (
            <Link to={`/series/${serie.id}`} key={serie.id}>
              <SeriesCard serie={serie} type={"seriesList"} />
            </Link>
          );
        })}   
    </div>
  )
}

export default SearchResults