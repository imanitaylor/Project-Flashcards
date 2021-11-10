

import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../src/utils/api";

/*
shows all th info about a specific deck ith options to edit card, or add card, navigate to study screen or delete a deck
 /decks/:deckId


-The path to this screen should include the deckId (i.e., /decks/:deckId).
You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
-There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
-The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").
-The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons. Each button takes the user to a different destination, as follows:

        | Button Clicked | Destination |
        | -------------- | ---------------------------------------------------------------------------------------------- |
        -| "Edit" | Edit Deck Screen |
        -| "Study" | Study screen |
        -| "Add Cards" | Add Card screen |
        -| "Delete" | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

Each card in the deck:

is listed on the page under the "Cards" heading.
shows a question and the answer to the question.
has an “Edit” button that takes the user to the Edit Card screen when clicked.
has a “Delete” button that allows that card to be deleted.
*/
function Deck(){
    const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck).catch(console.error);
  }, [deckId]);


  const handleDelete = (deckId) => {
    const result = window.confirm(
      "Delete this deck? \n\nYou will not be able to recover it."
    );
    if (result === true) {
      deleteDeck(deckId);
    }
  };

return (

    <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li key="home" className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li key="deckName" className="breadcrumb-item">
             {deck.name}
            </li>
          </ol>
        </nav>
        <div>
            <h4>{deck.name}</h4>
        </div>
        <div>
            <p>{deck.description}</p>
        </div>
        <div className="row">
            <div className="col">
        <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => history.push(`/decks/${deck.id}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => history.push(`/decks/${deck.id}/study`)}
            >
              Study
            </button>
            <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary m-2"
              >
                Add Cards
              </Link>
            
            </div>
            <div>
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={() => handleDelete(deck.id)}
            >
              D
            </button>
            </div>
        </div>
      </div>
)


}

export default Deck;