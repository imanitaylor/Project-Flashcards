import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, createCard, updateCard } from "../utils/api";

function CardForm({ submit }) {
  const initialFormState = { front: "", back: "" };
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { cardId } = useParams();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    setDeck([]);
    readDeck(deckId).then(setDeck).catch(console.error);
  }, [setDeck, deckId]);

  useEffect(() => {
    setCard([]);
    readCard(cardId)
      .then((newCard) => {
        setCard(newCard)(setFormData({ ...newCard }));
      })
      .catch(console.error);
  }, [setDeck, deckId, cardId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (submit === "addcard") {
      createCard(deckId, formData)
        .then(setFormData({ ...initialFormState }))
        .catch(console.error);
    } else {
      updateCard(formData)
        .then((newCard) => history.push(`/decks/${deck.id}`))
        .catch(console.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="front" style={{ width: "100%" }}>
          <h6>Front</h6>
          <textarea
            style={{ width: "100%" }}
            id="front"
            name="front"
            rows={3}
            onChange={handleChange}
            value={formData.front}
          />
        </label>
      </div>
      <div>
        <label htmlFor="back" style={{ width: "100%" }}>
          <h6>Back</h6>
          <textarea
            style={{ width: "100%" }}
            id="back"
            name="back"
            rows={3}
            onChange={handleChange}
            value={formData.back}
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={() => history.push(`/decks/${deck.id}`)}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CardForm;
