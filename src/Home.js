import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

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

 
//   const handleClick = (event) => {
//     event.preventDefault();
//     console.log("Submitted");
//   };

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
            {decks.length > 0 &&
              decks.map((deck) => (
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                      View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                      Study
                    </Link>
                    <Link className="btn btn-danger">
                      Delete
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </Route>
        
        
      </Switch>
    </div>
  );
}

export default Home;
