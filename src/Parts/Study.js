import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck , deleteDeck } from "../utils/api";
import Study from "./Study";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    readDeck(deckId).then((data) => setDeck(data));
  }, [deckId]);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      const restart = window.confirm(
        'Restart the deck? Click "Cancel" to return to the home screen.'
      );
      if (restart) {
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } else {
        window.location.href = '/';
      }
    }
  };

  const displayCard = () => {
    if (deck.cards.length <= 2) {
      return (
        <div>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study.{' '}
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
              Add Cards
            </Link>
          </p>
        </div>
      );
    }

    const card = deck.cards[currentCardIndex];

    return (
      <div>
        <h2>Card {currentCardIndex + 1} of {deck.cards.length}</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {isFlipped ? 'Back' : 'Front'}
            </h5>
            <p className="card-text">
              {isFlipped ? card.back : card.front}
            </p>
            <button className="btn btn-secondary" onClick={toggleFlip}>
              Flip
            </button>
            {isFlipped && (
              <button className="btn btn-primary" onClick={nextCard}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!deck) return null;

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
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      {displayCard()}
    </div>
  );
}

export default Study;