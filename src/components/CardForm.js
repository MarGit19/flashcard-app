import React from 'react';

function CardForm({ card, handleSubmit, handleChange, handleDone }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='front' className='form-label'>
            Front
          </label>
          <textarea
            className='form-control'
            id='front'
            name='front'
            rows='4'
            placeholder='Front side of the card'
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='back' className='form-label'>
            Back
          </label>
          <textarea
            className='form-control'
            id='back'
            name='back'
            rows='4'
            placeholder='Back side of the card'
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type='button'
          className='btn btn-secondary mr-2'
          onClick={handleDone}
        >
          Done
        </button>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
    </div>
  );
}


export default CardForm;