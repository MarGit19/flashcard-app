import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import { readDeck, createCard } from "../utils/api/index";


function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: '', description: '' });

  // Load the deck
  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      deleteDeck(deckId).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="mb-4">
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
      </div>
      <div className="mb-4">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
          Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">
          Add Cards
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <h2>Cards</h2>
      {deck.cards && deck.cards.length > 0 ? (
        <div className="card-deck">
          {deck.cards.map((card) => (
            <div className="card" key={card.id}>
              <div className="card-body">
                <h5 className="card-title">{card.front}</h5>
                <p className="card-text">{card.back}</p>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this card?')) {
                      // Handle card deletion here
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cards available in this deck. You can add cards by clicking "Add Cards" above.</p>
      )}
    </div>
  );
}

export default Deck;