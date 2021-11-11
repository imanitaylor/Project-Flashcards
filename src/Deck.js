//Completed

import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../src/utils/api";

/*
shows all th info about a specific deck ith options to edit card, or add card, navigate to study screen or delete a deck
 /decks/:deckId


-The path to this screen should include the deckId (i.e., /decks/:deckId).
-You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
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

-is listed on the page under the "Cards" heading.
-shows a question and the answer to the question.
-has an “Edit” button that takes the user to the Edit Card screen when clicked.
-has a “Delete” button that allows that card to be deleted.
*/
function Deck(){
const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  

  const loadDeck = () => {
    readDeck(deckId).then(setDeck).catch(console.error);
  };

  useEffect(() => {
    setDeck([]);
    loadDeck();
  }, [setDeck, deckId]);


  const handleDelete = (deckId) => {
    const result = window.confirm(
      "Delete this deck? \n\nYou will not be able to recover it."
    );
    if (result === true) {
        deleteDeck(deckId).then(history.push("/"));
    }
  };

  const handleCardDelete = (cardId) => {
    const result = window.confirm(
      "Delete this card? \n\nYou will not be able to recover it."
    );
    if (result === true) {
        deleteCard(cardId).then(loadDeck);
    }
  };


  if(!deck.name)return <h3>Shuffling your deck</h3>

  const cards = deck.cards.map((card)=>{
return(
    <div className="card m-3" style={{ width: "100%" }}>
  <div className="card-body row">
      <div className="col">
    <p className="card-text">{card.front}</p>
    </div>
    <div className="col">
    <p className="card-text">{card.back}</p>
    <div className="d-flex justify-content-end">
    <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={() => handleCardDelete(card.id)}
            >
              Delete
            </button>
            </div>
            </div>
  </div>
</div>
)


  })
 


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
        <div className="row mb-3">
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
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
            >
              Add Cards
            </button>
            </div>
            <div>
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={() => handleDelete(deck.id)}
            >
              Delete
            </button>
            </div>
            
        </div>
        <div><h4>Cards</h4></div>
        <div>{cards}</div>
      </div>
)


}

export default Deck;