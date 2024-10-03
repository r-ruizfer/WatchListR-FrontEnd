import { useNavigate } from "react-router-dom";
import SearchImage from "../assets/magnifier.png"

function Search({ type, searchValue, setSearchValue }) {

  const navigate = useNavigate()

  if (type === "navbar") {

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };

    const handleSearchButton = () => {
      navigate(`/series/searchResults/${searchValue}`)
      window.location.reload(`/series/searchResults/${searchValue}`)
    }

    return (
      <div style={{ display: "flex" , padding: "20px"}}>
        <input id="search-id" style={{backgroundColor: "#282a36", color:"#f8f8f2", height: "40px", width: "300px", padding: "0 15px", border: "none", borderRadius:"10px"}}
          onChange={handleSearchChange}
          value={searchValue}
          type="text"
          placeholder="Buscar"
        ></input>
        <button onClick={handleSearchButton} style={{backgroundColor: "transparent", border: "none"}}>
          <img src={SearchImage} alt="Buscar" style={{width: "35px"}} />
        </button>
      </div>
    );

  } else {

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };

    return (
      <div style={{ display: "flex" , padding: "20px"}}>
        <input style={{backgroundColor: "#282a36", color:"#020100", height: "40px", width: "300px"}}
          onChange={handleSearchChange}
          value={searchValue}
          type="text"
          placeholder="Buscar"
        ></input>
      </div>
    );
  }

  
}

export default Search;