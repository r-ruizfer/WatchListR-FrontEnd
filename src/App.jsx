import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import SeriesList from "./pages/SeriesList.jsx";
import SeriesDetails from "./pages/SeriesDetails.jsx";
import MyList from "./pages/MyList.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Navbar from "./components/Navbar.jsx";
import SearchResults from "./pages/SearchResults.jsx";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  return (
    <>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/series"
          element={
            <SeriesList
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          }
        />
        <Route path="/series/:seriesId" element={<SeriesDetails />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/mylist"
          element={
            <MyList
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/series/searchResults"
          element={
            <SearchResults
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
