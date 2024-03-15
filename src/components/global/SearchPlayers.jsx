import React, { useState, useEffect, useRef } from 'react';
import { useGetPlayersQuery } from '../../services/fgApi';
import './SearchPlayers.css';

export function SearchPlayers({ onClick, onSearch }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null); // This ref is attached to the dropdown container
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm && searchTerm.length > 2) {
        setSearchValue(searchTerm);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm, onSearch]);

  const {
    data: players,
    error: playersError,
    isLoading: playersLoading,
  } = useGetPlayersQuery({ firstName: searchValue, lastName: searchValue, type: 'hitter' });

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    }

    // Only add the event listener if the dropdown is visible
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  // Modify this function to also hide the dropdown
  const handleRowClick = (player) => {
    onClick(player);
    setIsVisible(false); // Hide the dropdown
  };

  // Use this function to show the dropdown
  const handleFocus = () => {
    setIsVisible(true);
  };

  return (
    <div className='search-container' ref={containerRef}>
      <input
        type='text'
        placeholder='Search players...'
        value={searchTerm}
        // Assuming you have a method to update the searchValue
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleFocus();
        }}
      />
      {isVisible && playersLoading && <div>Searching for players...</div>}
      {isVisible && playersError && <div>Error: {playersError.message}</div>}

      {isVisible && players && (
        <ul className='search-results'>
          {players.map((player) => (
            <li key={player.id} onClick={() => handleRowClick(player)}>
              {player.first_name} {player.last_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
