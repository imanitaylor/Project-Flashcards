
//Completed 

import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../src/utils/api";

/*
allows the user to study the cards from a specific deck
/decks/:deckId/study


-The path to this screen should include the deckId (i.e., /decks/:deckId/study).
-You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
-There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied and finally the text Study (e.g., Home/Rendering In React/Study).
-The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
-Cards are shown one at a time, front-side first.
-A button at the bottom of each card "flips" it to the other side.
-After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card.
-After the final card in the deck has been shown, a message (see the "Restart prompt" section below) is shown offering the user the opportunity to restart the deck.
-If the user does not restart the deck, they should return to the home screen.
-Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.

Nextbutton
-The next button appears after the card is flipped.
-Restart prompt
-When all cards are finished, a message is shown and the user is offered the opportunity to restart the deck. If the user does not restart the deck, they return to the home screen.

Not enough cards
-Studying a Deck with two or fewer cards should display a "Not enough cards" message and a button to add cards to the deck.
-Clicking the "Add Cards" button should take the user to the Add Card screen.
*/

function Study() {
  const [deck, setDeck] = useState({});
  const { cards } = deck;
  const [cardSide, setCardSide] = useState("front");
  const [index, setIndex] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId)
      .then((theDeck) => setDeck(theDeck))
      .catch(console.error);
  }, [setDeck, deckId]);


  const handleFlip = (event) => {
    if (cardSide === "front") {
      setCardSide("back");
    }
    if (cardSide === "back") {
      setCardSide("front");
    }
  };

  const handleNext = (event) => {
    if(index < cards.length-1){
      setIndex((index)=>index+1)
      setCardSide("front")
  }else{
      if(window.confirm("Restart cards? \n\nClick 'cancel' to return to the home page.")){
        setIndex(0)
        setCardSide("front")
      }else{
          history.push("/")
      }
  }
  }



  if (!deck.name) return <h3>Shuffling your deck</h3>;
  const card = deck.cards[index];
  const studyCard = (
    <div class="card m-3" style={{ width: "100%" }}>
      <div class="card-body">
        <h5 class="card-title">
          Card {index + 1} of {cards.length}
        </h5>
        <p class="card-text">{cardSide === "front" ? card.front : card.back}</p>
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={handleFlip}
        >
          Flip
        </button>
        {cardSide === "back" && (
          <button className="btn btn-primary" onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );


  const lowCards = (
    <div>
      <h3>Not enough cards.</h3>
      <p>You need at lesast 3 cards to study. There are {cards.length} cards in this deck.</p>
      <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
            >
              Add Cards
            </button>
    </div>

  )


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
              key="study"
              className="breadcrumb-item active"
              aria-current="page"
            >
              Study
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h1>Study: {deck.name}</h1>
      </div>
      {cards.length > 2 && (<div>{studyCard}</div>)}
      {cards.length <= 2 && (<div>{lowCards}</div>)}
    </div>
  );


}
export default Study;
