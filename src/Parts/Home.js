import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api';
import classNames from '../utils/class-names/index';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then((data) => setDecks(data));
  }, []);

  const handleDeleteDeck = (deckId) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      deleteDeck(deckId).then(() => {
        listDecks().then((data) => setDecks(data));
      });
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary mb-2">
        Create Deck
      </Link>
      <div className="row">
        {decks.map((deck) => (
          <div key={deck.id} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.cards.length} cards</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                  View
                </Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                  Study
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteDeck(deck.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;