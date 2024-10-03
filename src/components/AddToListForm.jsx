import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddToListForm(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [poster_path, setPosterPath] = useState(props.image);
  const [rating, setRating] = useState("");
  const [personalWatchlist, setPersonalWatchlist] = useState(null);
  const handleRating = (e) => setRating(e.target.value);
  const handlePersonalWatchlist = (e) => setPersonalWatchlist(e.target.value);
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSerie = {
      name: props.name,
      poster_path,
      id: props.id,
      genres: props.genres,
      rating,
      personalWatchlist,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/personalWatchlist`,
        newSerie
      );
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/personalWatchlist?id=${props.id}`
      );
      props.setSerieInWatchlist(response.data);
      navigate("/mylist");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedSerie = {
      name: props.name,
      poster_path,
      id: props.id,
      genres: props.genres,
      rating,
      personalWatchlist,
    };

    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/personalWatchlist/${props.id}`,
        updatedSerie
      );
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/personalWatchlist?id=${props.id}`
      );
      props.setSerieInWatchlist(response.data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (props.type === "add") {

    return (
      <>
        <Button
          style={{
            backgroundColor: "	#50fa7b",
            color: "#282a36",
            fontWeight: "bold",
            border: "none",
          }}
          onClick={openModal}
        >
          Añadir a Lista
        </Button>
  
        <Modal show={modalIsOpen} onHide={closeModal}>
          <Modal.Header closeButton style={{display: "flex", alignItems: "flex-start", backgroundColor: "#44475a", color: "white"}}>
            <Modal.Title style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "0 80px", textAlign: "center"}}>
              <img src={props.image} height={200} alt="imagen serie" />
              <h1>{props.name}</h1>
            </Modal.Title>
          </Modal.Header>
  
          <Modal.Body style={{backgroundColor: "#44475a", color: "white"}}>
            <Form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
              <Form.Group>
                <Form.Label>Añadir a lista</Form.Label>
                <Form.Select
                  name="personalWatchlist"
                  onChange={handlePersonalWatchlist}
                  value={personalWatchlist}
                  style={{backgroundColor: "#282a36", color: "#f8f8f2"}}
                >
                  <option value="-">---</option>
                  <option value="wantToWatch">Quiero Verla</option>
                  <option value="watching">Viendo</option>
                  <option value="watched">Vista</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                style={{
                  display:
                    personalWatchlist === "watching" ||
                    personalWatchlist === "watched"
                      ? "block"
                      : "none",
                }}
              >
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  className="rating-form"
                  name="rating"
                  onChange={handleRating}
                  defaultValue="-"
                  style={{backgroundColor: "#282a36", color: "#f8f8f2"}}
                >
                  <option value="-">---</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>
  
              <Button style={{backgroundColor: "#8be9fd", color: "black", fontWeight: "bold"}} type="submit" disabled={personalWatchlist === null || personalWatchlist === "-"}>Añadir</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );

  } else if (props.type === "update") {
    return (
      <>
        <Button
          style={{
            backgroundColor: "	#8be9fd",
            color: "#282a36",
            fontWeight: "bold",
            border: "none",
          }}
          onClick={openModal}
        >
          Actualizar Estado
        </Button>

        <Modal show={modalIsOpen} onHide={closeModal}>
          <Modal.Header closeButton style={{display: "flex", alignItems: "flex-start", backgroundColor: "#44475a", color: "white"}}>
            <Modal.Title style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "0 80px", textAlign: "center"}}>
              <img src={props.image} height={200} alt="imagen serie" />
              <h1>{props.name}</h1>
            </Modal.Title>
          </Modal.Header>
  
          <Modal.Body style={{backgroundColor: "#44475a", color: "white"}}>
            <Form onSubmit={handleUpdate} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
              <Form.Group>
                <Form.Label>Actualizar Estado</Form.Label>
                <Form.Select
                  name="personalWatchlist"
                  onChange={handlePersonalWatchlist}
                  style={{backgroundColor: "#282a36", color: "#f8f8f2"}}
                >
                  <option value="-">---</option>
                  <option value="wantToWatch">Quiero Verla</option>
                  <option value="watching">Viendo</option>
                  <option value="watched">Vista</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                style={{
                  display:
                    personalWatchlist === "watching" ||
                    personalWatchlist === "watched"
                      ? "block"
                      : "none",
                }}
              >
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  className="rating-form"
                  name="rating"
                  onChange={handleRating}
                  style={{backgroundColor: "#282a36", color: "#f8f8f2"}}
                >
                  <option value="-">---</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>
  
              <Button style={{backgroundColor: "#8be9fd", color: "black", fontWeight: "bold", border: "none"}} type="submit" disabled={personalWatchlist === null || personalWatchlist === "-"}>Actualizar</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AddToListForm;
