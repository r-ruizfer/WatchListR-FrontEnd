import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MyCarousel({ series, setSeries }) {

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/tv/top_rated",
    params: { language: "en-US", page: `1` },
    headers: {
      accept: "application/json",
      Authorization: `${import.meta.env.VITE_API_KEY}`,
    },
  }

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setSeries(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [setSeries]);

  if (series === null) {
    return <h3>...cargando</h3>
  }


  return (
    <Carousel className='carousel'>
      {series.map((serie) => {
        return (
            <Carousel.Item key={serie.id}>
              <Link to={`/series/${serie.id}`}>
                <img className='carousel-img' src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`} alt="Poster" />
              </Link>

              <Carousel.Caption >
                <h3 style={{backgroundColor: "rgb(0, 0, 0, 0.8)", borderRadius: "15px", padding: "5px"}}>{serie.name}</h3>
              </Carousel.Caption>
          </Carousel.Item>
        )
      })}
      </Carousel>
  )
}

export default MyCarousel