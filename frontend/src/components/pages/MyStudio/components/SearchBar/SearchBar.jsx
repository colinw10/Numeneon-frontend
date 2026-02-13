import { useState, useEffect } from 'react';
import Avatar from '../Avatar/Avatar'; // reuse the Avatar component
import './SearchBar.scss';

function SearchBar({ searchEndpoint }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(`${searchEndpoint}?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query, searchEndpoint]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading...</p>}

      {results.length > 0 && (
        <ul className="search-results">
          {results.map((user) => (
            <li key={user.id} className="search-result-item">
              <Avatar avatar={user.avatar || 'default'} size={40} />
              <span className="username">{user.username}</span>
              {user.hasMySpace && <span className="myspace-badge">MySpace</span>}
            </li>
          ))}
        </ul>
      )}

      {query && !loading && results.length === 0 && (
        <p className="no-results">No users found.</p>
      )}
    </div>
  );
}

export default SearchBar;
