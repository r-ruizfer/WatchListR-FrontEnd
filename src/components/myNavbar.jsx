import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { useState } from "react";

function MyNavbar({ searchValue, setSearchValue }) {

  const [collapse, setCollapse] = useState(false)

  const handleCollapse = () => {
    setCollapse(!collapse)
    console.log(collapse)
  }

  const styleCollapsed = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "15px"
  }

  const styleNotCollapsed = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center"
  }

  return (
    <Navbar expand="lg" className="navbar" collapseOnSelect >
    <Container>
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleCollapse}/>
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="me-auto" style={collapse ? styleCollapsed : styleNotCollapsed}>
          <Nav.Link as={Link} to="/series">
            <h5> Series más populares </h5>
          </Nav.Link>
          <Nav.Link as={Link} to="/mylist">
            <h5> Mi lista </h5>
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            <h5> About </h5>
          </Nav.Link>
          <Search
          type="navbar"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        </Nav>
        
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}
export default MyNavbar;
