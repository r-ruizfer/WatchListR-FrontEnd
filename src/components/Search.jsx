function Search({ searchValue, setSearchValue }) {

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

export default Search;