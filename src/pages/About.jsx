import TeamInfo from "../components/TeamInfo"

function About() {
  return (
    
    <div className="about">
      
      <h1>Miembros del equipo</h1>
    
      <div className="team-member-card">
        <TeamInfo
          name={'Enrique Páez'}
          github={'https://github.com/enriquepaez'}
          linkedin={'https://www.linkedin.com/in/enrique-paez/'}
        />
      </div>
      <div className="team-member-card">
        <TeamInfo
          name={'Ruben Ruiz'}
          github={'https://github.com/r-ruizfer'}
          linkedin={'https://www.linkedin.com/in/ruben-ruiz-5b451630b/'}
        />
      </div>

      <h4 style={{textAlign: "center", width: "800px"}}>Unimos fuerzas para crear WatchlistR, una plataforma diseñada para que organizar y disfrutar tus series sea más fácil que nunca.
      </h4>
    </div>
  )
}

export default About