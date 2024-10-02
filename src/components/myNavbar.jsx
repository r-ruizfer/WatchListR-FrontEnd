import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import Search from "./Search"


function MyNavbar({ searchValue, setSearchValue }) {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <Link to="/series">
        <h1>Series más populares</h1>
      </Link>

      <Link to="/mylist">
        <h1>Mi lista</h1>
      </Link>

      <Link to="/about">
        <h1>About</h1>
      </Link>

      <Search type="navbar" searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
  )
}

export default MyNavbar