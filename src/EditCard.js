

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../src/utils/api";
/*

allows user to modify information on an existing card
/decks/:deckId/cards/:cardId/edit

-The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
-You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
-There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
-It displays the same form as the Add Card screen, except it is pre-filled with information for the existing card. It can be edited and updated.
-If the user clicks on either "Save" or "Cancel", the user is taken to the Deck screen.


*/

function EditCard(){

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const { deckId } = useParams();
    const { cardId } = useParams();
    const ac = new AbortController();
    const initialFormState = { front: "", back: "" };
    const [formData, setFormData] = useState({ ...initialFormState });
    const history = useHistory();

      useEffect(() => {
        setDeck([]);
        readDeck(deckId).then(setDeck).catch(console.error);
        return () => ac.abort();
      }, [setDeck, deckId]);



      useEffect(() => {
        setCard([]);
        readCard(cardId).then((newCard)=>{
            setCard(newCard)
            (setFormData({...newCard}))
        }).catch(console.error);
        return () => ac.abort();
      }, [setDeck, deckId, cardId]);



      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        updateCard(formData)
        .then((newCard)=>history.push(`/decks/${newCard.id}`))
      .catch(console.error);
        
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
                  Edit Card {card.id}
                </li>
              </ol>
            </nav>
          </div>
          <div>
            <h3>Edit Card</h3>
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
              Cancel
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
      )

}

export default EditCard;