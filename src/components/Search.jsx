import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

function Search({ type, searchValue, setSearchValue }) {

  const navigate = useNavigate()
  const params = useParams()

  if (type === "navbar") {

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
      console.log(event.target.value)
    };

    const handleSearchButton = () => {
      navigate(`/series/searchResults`)
    }

    return (
      <div style={{ display: "flex" , padding: "20px"}}>
        <input style={{color:"#020100", height: "40px", width: "300px"}}
          onChange={handleSearchChange}
          value={searchValue}
          type="text"
          placeholder="Buscar"
        ></input>
        <button onClick={handleSearchButton}>Buscar</button>
      </div>
    );

  } else {

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };

    return (
      <div style={{ display: "flex" , padding: "20px"}}>
        <input style={{color:"#020100", height: "40px", width: "300px"}}
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