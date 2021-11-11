//Completed 

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../src/utils/api";

/*

allows user to add an card to an existing deck
/decks/:deckId/cards/new


-The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
-You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
-There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).
-The screen displays the "React Router: Add Card" deck title.
-A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
-If the user clicks "Save", a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
-If the user clicks "Done", the user is taken to the Deck screen.

*/

function AddCard() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const initialFormState = { front: "", back: "" };
    const [formData, setFormData] = useState({ ...initialFormState });
    const history = useHistory();

      useEffect(() => {
        setDeck([]);
        readDeck(deckId).then(setDeck).catch(console.error);
      }, [setDeck, deckId]);


      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        createCard(deckId, formData)
        .then(setFormData({ ...initialFormState }))
        .catch(console.error)
        
      };



  return (
    <div className="container">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li key="home" className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li key="deckName" className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li
              key="createDeck"
              className="breadcrumb-item active"
              aria-current="page"
            >
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h3>{deck.name}: Add Card</h3>
      </div>


      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="front" style={{ width: "100%" }}>
              <h6>Front</h6>
              <textarea
                style={{ width: "100%" }}
                id="front"
                name="front"
                rows={3}
                placeholder="Front side of card"
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
                placeholder="Back side of card"
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
            <button
              type="submit"
              className="btn btn-primary m-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>


    </div>
  );
}

export default AddCard;
