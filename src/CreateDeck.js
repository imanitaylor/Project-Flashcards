import React from "react";
import { Link } from "react-router-dom";


/*
// allows the user to create a new deck
// /decks/new
-The path to this screen should be /decks/new.
-There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
A form is shown with the appropriate fields for creating a new deck.
The name field is an <input> field of type text.
The description field is a <textarea> field that can be multiple lines of text.
If the user clicks "submit", the user is taken to the Deck screen.
If the user clicks "cancel", the user is taken to the Home screen.
*/


function CreateDeck(){
    
    return (
        <div className="container">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Create Deck
                </li>
              </ol>
            </nav>
          </div>
        </div>
      );
    

}

export default CreateDeck;