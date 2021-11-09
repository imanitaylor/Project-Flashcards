import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../src/utils/api";

/*
Include the Layout screen
The path to this screen should be /.
A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
Clicking the “Study” button brings the user to the Study screen.
Clicking the “View” button brings the user to the Deck screen.
Clicking the “Delete” button shows a warning message before deleting the deck.

*/

function Home() {
  const [decks, setDecks] = useState({});
  const ac = new AbortController();

  const loadDecks = () => {
    listDecks(ac.signal).then(setDecks).catch(console.error);
  };

  useEffect(() => {
    setDecks([]);
    loadDecks();
    return () => ac.abort();
  }, [setDecks]);


  const handleDelete = (deckId) => {
    const result = window.confirm(
      "Delete this deck? \n\nYou will not be able to recover it."
    );
    if (result === true) {
      deleteDeck(deckId).then(loadDecks);
    }
  };

  
  const deckDisplay =
    decks.length > 0 &&
    decks.map((deck) => (
      <div className="card p-2 m-3" style={{ width: "100%" }}>
        <div className="card-body">
          <div className="row">
            <h5 className="col card-title">{deck.name}</h5>
            <h6 className="text-secondary">{decks.length} cards</h6>
          </div>
          <p className="card-text">{deck.description}</p>
          <div className="row">
            <div className="col">
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-2">
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary m-2"
              >
                Study
              </Link>
            </div>
            <div>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleDelete(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <div className="container">
            <div>
              <Link to="/decks/new" className="btn btn-secondary btn-lg">
                + Create Deck
              </Link>
            </div>
            <div>{deckDisplay}</div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Home;
