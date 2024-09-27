function TeamInfo(props) {
  return (
    <div className="team-info">
      <h3 className="team-names">Nombre: {props.name}</h3>
      <a style={{textDecoration: "none"}} href={props.github}>
        <h4 className="socials-link" style={{ backgroundColor: '#2B3137' }}>
          GitHub
        </h4>
      </a>
      <a style={{textDecoration: "none"}} href={props.linkedin}>
        <h4 className="socials-link" style={{ backgroundColor: '#0077b5' }}>
          Linkedin
        </h4>
      </a>
    </div>
  )
}

export default TeamInfo