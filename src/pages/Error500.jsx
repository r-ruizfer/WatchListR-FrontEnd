import Button from "react-bootstrap/Button";
import Error500 from "../assets/error500.png"
import { useNavigate } from "react-router-dom"

function Error500Page() {

  const navigate = useNavigate()

  return (
    <div className="error-page">
      <img src={Error500} alt="Error 500" />
      <Button onClick={() => navigate("/")}><h2>Volver a Inicio</h2></Button>
    </div>
  )
}

export default Error500Page