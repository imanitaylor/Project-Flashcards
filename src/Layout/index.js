import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import CreateDeck from "../CreateDeck";
import Study from "../Study";
import Deck from "../Deck";
import EditDeck from "../EditDeck";
import AddCard from "../AddCard";
import EditCard from "../EditCard";

function Layout() {
  return (
    <>
      <Router>
      <Header />
      <div className="container">
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
      </Router>
    </>
  );
}

export default Layout;
