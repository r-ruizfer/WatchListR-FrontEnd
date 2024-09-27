function SeriesCard({ serie }) {

  return (
    <div className="series-card">
      <img src={`${import.meta.env.VITE_IMAGE_URL}/${serie.poster_path}`} alt="Imagen" />
      
      <h3>{serie.name}</h3>
    </div>
  )
}

export default SeriesCard