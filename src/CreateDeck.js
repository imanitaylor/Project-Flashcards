//Comp

import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../src/utils/api";

/*
// allows the user to create a new deck
// /decks/new
-The path to this screen should be /decks/new.
-There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
-A form is shown with the appropriate fields for creating a new deck.
-The name field is an <input> field of type text.
-The description field is a <textarea> field that can be multiple lines of text.
-If the user clicks "submit", the user is taken to the Deck screen.
-If the user clicks "cancel", the user is taken to the Home screen.
-Create better layout, to match layout of example
-Make the description area multiple rows
*/

function CreateDeck() {
  const initialFormState = { name: "", description: "" };
  // useState to handle the change when inputting into the fields
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData)
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
            <li
              key="createDeck"
              className="breadcrumb-item active"
              aria-current="page"
            >
              Create Deck
            </li>
          </ol>
        </nav>
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
                placeholder="Deck Name"
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
                placeholder="Brief description of the deck"
                onChange={handleChange}
                value={formData.description}
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => history.push("/")}
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

export default CreateDeck;
