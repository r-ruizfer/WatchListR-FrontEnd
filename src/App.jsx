import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import SeriesList from "./pages/SeriesList.jsx";
import SeriesDetails from "./pages/SeriesDetails.jsx";
import MyList from "./pages/MyList.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import MyNavbar from "./components/myNavbar.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Error500Page from "./pages/Error500.jsx";

function App() {
  const [series, setSeries] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  return (
    <>
      <MyNavbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Routes>
        <Route path="/" element={<HomePage series={series} setSeries={setSeries}/>} />
        <Route
          path="/series"
          element={
            <SeriesList
              series={series}
              setSeries={setSeries}
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
        <Route path="/Error" element={<Error500Page/>}/>
        <Route
          path="/series/searchResults/:query"
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
