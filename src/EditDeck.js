//Completed

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../src/utils/api";
/*
// allows user to modify information on an existing deck
// /decks/:deckId/edit

-The path to this screen should include the deckId(i.e., /decks/:deckId/edit).
-You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
-There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).
-It displays the same form as the Create Deck screen
-except it is pre-filled with information for the existing deck.
-The user can edit and update the form.
-If the user clicks "Cancel", the user is taken to the Deck screen.

*/

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    setDeck([]);
    readDeck(deckId)
      .then((newDeck) => {
        setDeck(newDeck)(setFormData({ ...newDeck }));
      })
      .catch(console.error);
  }, [setDeck, deckId]);

  const initialFormState = { name: "", description: "" };
  // useState to handle the change when inputting into the fields
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(formData)
      .then((newDeck) => history.push(`/decks/${newDeck.id}`))
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
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h3>Edit Deck</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" style={{ width: "100%" }}>
              <h6>Name</h6>
              <input
                style={{ width: "100%" }}
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description" style={{ width: "100%" }}>
              <h6>Description</h6>
              <textarea
                style={{ width: "100%" }}
                id="description"
                name="description"
                rows={5}
                onChange={handleChange}
                value={formData.description}
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary m-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDeck;
