import Button from "react-bootstrap/Button";
import Error404 from "../assets/error404.png";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <img src={Error404} alt="Error 404" />
      <Button onClick={() => navigate("/")}>
        <h2>Volver a Inicio</h2>
      </Button>
    </div>
  );
}

export default ErrorPage;
