import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import { listDecks } from "../src/utils/api";
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

  useEffect(() => {
    const ac = new AbortController();
    setDecks([]);
    const loadDecks = () => {
      listDecks(ac.signal).then(setDecks).catch(console.error);
    };
    loadDecks();
    return () => ac.abort();
  }, [setDecks]);

  if (decks.length > 0) {
    decks.map((deck) => console.log(deck.name));
  } else console.log("no deck");

  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/">
          <Layout />
          <div className="container">
            <button type="button" className="btn btn-secondary btn-lg">
              + Create Deck
            </button>
          </div>
          <div>
            {decks.length > 0 && (decks.map((deck) => (
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{deck.name}</h5>
                  <p className="card-text">
                    {deck.description}
                  </p>
                  <button type="button" className="btn btn-secondary">
              View
            </button>
            <button type="button" className="btn btn-primary">
              Study
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
                </div>
              </div>
            )))}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Home;
