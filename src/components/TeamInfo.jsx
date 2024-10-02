import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function TeamInfo(props) {
  return (
    <Card className="team-info-card">
      <Card.Body>
        <Card.Title>
          <h3>{props.name}</h3>
        </Card.Title>
        <div className="team-info-btns">
          <Button variant="dark" href={props.github}>
            GitHub{" "}
          </Button>
          <Button variant="primary" href={props.linkedin}>
            LinkedIn
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TeamInfo;
