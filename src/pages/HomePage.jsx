import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div>
      <h1>Bienvenido a WatchListR</h1>
      <div>
        <Link to="/series">
          <h1>Listado de series</h1>
        </Link>

        <Link to="/mylist">
          <h1>Mi lista</h1>
        </Link>
      </div>
    </div>
  )
}

export default HomePage