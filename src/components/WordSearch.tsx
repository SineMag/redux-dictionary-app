// This component will have an input field and a button. On click, it will dispatch the fetchWordDefinition thunk.

import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchWordDefinition } from '../features/dictionary/dictionarySlice';

export const WordSearch: React.FC = () => {
  const [word, setWord] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (word.trim()) {
      dispatch(fetchWordDefinition(word.trim()));
    }
  };

  return (
    <div className='word-search'>
      <input className='word-input'
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
      />
      <button className='searchButton' onClick={handleSearch}>Search</button>
    </div>
  );
};
