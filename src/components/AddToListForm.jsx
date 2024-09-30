import { useRef, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function AddToListForm(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [name, setName] = useState(props.name);
  const [poster_path, setPosterPath] = useState(props.image);
  // const [id, setId] = useState(props.id);
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
  const subtitle = useRef(null);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSerie = {
      name: props.name,
      poster_path,
      serieApiId: props.id,
      rating,
      personalWatchlist,
    };
    try {
      await axios.post("http://localhost:5000/personalWatchlist", newSerie);
      const response = await axios.get(
        `http://localhost:5000/personalWatchlist?serieApiId=${props.id}`
      );
      
      props.setSerieInWatchlist(response.data)
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        style={{
          backgroundColor: "#22223b",
          borderRadius: "15px",
          color: "#9a8c98",
          border: "none",
          padding: "10px",
          fontSize: "15px",
          fontWeight: "bold",
          margin: "20px",
          width: "100px",
        }}
        onClick={openModal}
      >
        Añadir a Lista
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <img src={props.image} height={400} alt="imagen serie" />
          <h1>{props.name}</h1>
          <label>
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
          <label>
            Añadir a lista
            <select name="personalWatchlist" onChange={handlePersonalWatchlist}>
              <option value="-">---</option>
              <option value="wantToWatch">Want to Watch</option>
              <option value="watching">Watching</option>
              <option value="watched">Watched</option>
            </select>
          </label>
          <button type="submit"> Submit</button>
        </form>

        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  );
}

export default AddToListForm;
