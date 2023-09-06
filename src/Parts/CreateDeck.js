import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({ name: '', description: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({
      ...deck,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(deck).then((newDeck) => {
      history.push(`/decks/${newDeck.id}`);
    });
  };

  return (
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
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            value={deck.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            placeholder="Deck Description"
            value={deck.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default CreateDeck;