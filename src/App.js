import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Layout/Header";
import NotFound from "./Layout/NotFound"
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/decks/new">
            <CreateDeck />
        </Route>
        <Route exact path="/decks/:deckId/study">
            <Study />
        </Route>
        <Route exact path="/decks/:deckId">
            <Deck />
        </Route>
        <Route exact path="/decks/:deckId/edit">
            <EditDeck />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
