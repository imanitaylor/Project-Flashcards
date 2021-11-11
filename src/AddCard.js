//Completed

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../src/utils/api";
import CardForm from "./Layout/CardForm";
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

  useEffect(() => {
    setDeck([]);
    readDeck(deckId).then(setDeck).catch(console.error);
  }, [setDeck, deckId]);

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
      <CardForm submit="addcard" />
    </div>
  );
}

export default AddCard;
