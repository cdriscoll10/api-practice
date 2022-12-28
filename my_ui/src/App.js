// import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { getMovies, addMovie } from './api';

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  useEffect(() => {
    getMovies().then((res) => {
      setMovies(res.data);
    });
  }, []);

  const handleAddMovie = (e) => {
    e.preventDefault();
    addMovie(newMovie).then((res) => {
      setMovies([...movies, res.data]);
      setNewMovie('');
    });
  };

  return (
    <div>
      <h1>Movies</h1>
      <form onSubmit={handleAddMovie}>
        <input
          type="text"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
        />
        <button type="submit">Add Movie</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
