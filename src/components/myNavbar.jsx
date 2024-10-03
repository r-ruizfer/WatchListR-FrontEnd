import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function MyNavbar({ searchValue, setSearchValue }) {
  return (
    <Navbar expand="lg" className="navbar" collapseOnSelect>
    <Container>
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/series">
            {" "}
            <h5> Series más populares </h5>
          </Nav.Link>
          <Nav.Link as={Link} to="/mylist">
            <h5> Mi lista </h5>
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            <h5> About </h5>
          </Nav.Link>
        </Nav>
        <Search
          type="navbar"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}
export default MyNavbar;
