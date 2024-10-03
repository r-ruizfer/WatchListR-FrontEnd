import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import MyCarousel from "../components/myCarousel";

function HomePage({ series, setSeries }) {

  const navigate = useNavigate()

  return (
    <div className="homepage">
      <h1>Bienvenido a WatchListR</h1>
      <p>
        Organiza tus series favoritas de manera sencilla. Crea listas
        personalizadas según las series que quieres ver, las que estás viendo y
        las que ya has terminado. Además, podrás calificar cada serie y llevar
        un registro de tus valoraciones para encontrar fácilmente tus favoritas.
      </p>
      <MyCarousel series={series} setSeries={setSeries}/>
      <div className="homepage-btns">
        <Button style={{backgroundColor: "#50fa7b", color: "black"}} onClick={() => navigate("/series")}>
          <h1>Listado de series</h1>
        </Button>

        <Button style={{backgroundColor: "#8be9fd", color: "black"}} onClick={() => navigate("/mylist")}>
          <h1>Mi lista</h1>
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
