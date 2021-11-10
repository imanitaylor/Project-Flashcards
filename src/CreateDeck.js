import React, { useState } from "react";
import { Link } from "react-router-dom";

/*
// allows the user to create a new deck
// /decks/new
-The path to this screen should be /decks/new.
-There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
-A form is shown with the appropriate fields for creating a new deck.
-The name field is an <input> field of type text.
-The description field is a <textarea> field that can be multiple lines of text.
If the user clicks "submit", the user is taken to the Deck screen.
If the user clicks "cancel", the user is taken to the Home screen.
Create better layout, to match layout of example
Make the description area multiple rows
*/

function CreateDeck() {
  const initialFormState = { name: "", description: "" };
  // useState to handle the change when inputting into the fields
  const [formData, setFormData] = useState({...initialFormState});

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    setFormData({ ...initialFormState });
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
          <label htmlFor="name">
            Deck Name:
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
          </label>
          <label htmlFor="description">
          Description:
            <input
              id="description"
              type="textarea"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
          </label>
          <div>
          <button type="button">Cancel</button>
          <button type="submit">Submit</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
