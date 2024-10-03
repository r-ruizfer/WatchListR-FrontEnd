import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
Modal.setAppElement("#root");

function AddToListForm(props) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [poster_path, setPosterPath] = useState(props.image);
  const [rating, setRating] = useState("");
  const [personalWatchlist, setPersonalWatchlist] = useState(null);
  const handleRating = (e) => setRating(e.target.value);
  const handlePersonalWatchlist = (e) => setPersonalWatchlist(e.target.value);
  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

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
            color: "#f8f8f2",
            fontWeight: "bold",
            border: "none",
          }}
          onClick={openModal}
        >
          Añadir a Lista
        </Button>
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={handleSubmit}>
            <img src={props.image} height={400} alt="imagen serie" />
            <h1>{props.name}</h1>
            <label>
              Añadir a lista
              <select
                name="personalWatchlist"
                onChange={handlePersonalWatchlist}
              >
                <option value="-">---</option>
                <option value="wantToWatch">Want to Watch</option>
                <option value="watching">Watching</option>
                <option value="watched">Watched</option>
              </select>
            </label>
            <label
              style={{
                display:
                  personalWatchlist === "watching" ||
                  personalWatchlist === "watched"
                    ? "block"
                    : "none",
              }}
            >
              Rating
              <select
                className="rating-form"
                name="rating"
                onChange={handleRating}
              >
                <option value="-">---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <button type="submit"> Submit</button>
          </form>
          <button onClick={closeModal}>close</button>
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={handleUpdate}>
            <img src={props.image} height={400} alt="imagen serie" />
            <h1>{props.name}</h1>
            <label>
              Cambiar lista{" "}
              <select
                name="personalWatchlist"
                onChange={handlePersonalWatchlist}
              >
                <option value="-">---</option>
                <option value="wantToWatch">Want to Watch</option>
                <option value="watching">Watching</option>
                <option value="watched">Watched</option>
              </select>
            </label>
            <label
              style={{
                display:
                  personalWatchlist === "watching" ||
                  personalWatchlist === "watched"
                    ? "block"
                    : "none",
              }}
            >
              Rating
              <select name="rating" onChange={handleRating}>
                <option value="-">---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <button type="submit"> Submit</button>
          </form>
          <button onClick={closeModal}>close</button>
        </Modal>
      </>
    );
  }
}
export default AddToListForm;
