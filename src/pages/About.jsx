import TeamInfo from "../components/TeamInfo"

function About() {
  return (
    <div className="about">
      
      <h2>Miembros del equipo</h2>
    
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
    </div>
  )
}

export default About