import './App.css'
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/Homepage.jsx"
import About from "./pages/About.jsx"
import SeriesList from "./pages/SeriesList.jsx"
import SeriesDetails from "./pages/SeriesDetails.jsx"
import MyList from "./pages/MyList.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<SeriesList />} />
        <Route path="/series/:seriesId" element={<SeriesDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
