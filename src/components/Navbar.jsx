import logo from "../assets/logo.png"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <Link to="/series">
        <h1>Listado de series</h1>
      </Link>

      <Link to="/mylist">
        <h1>Mi lista</h1>
      </Link>

      <Link to="/about">
        <h1>About</h1>
      </Link>
    </div>
  )
}

export default Navbar