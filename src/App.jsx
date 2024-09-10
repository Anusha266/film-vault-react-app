import { useState, useEffect } from 'react';
import './App.css'; // Ensure to include any custom styles if necessary
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const url = 'https://freetestapi.com/api/v1/movies';

  const [movie, setMovie] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const movieHandler = (e) => {
    setMovie(e.target.value);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      //console.log(result);

      if (result && Array.isArray(result)) {
        setMovies(result);
      } else {
        setError("Unexpected response format");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredMovies = movie.length === 0
    ? movies
    : movies.filter((mov) =>
        mov.title && mov.title.toLowerCase().includes(movie.toLowerCase())
      );

  if (loading) {
    return <p>Loading.....</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
  <p className='film-title'>Film Vault</p>
      <input
        onChange={movieHandler}
        type="text"
        className="form-control mb-4"
        placeholder='Search any movie'
        value={movie}
      />
      

      <div className="row">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((mov) => (
            <div key={mov.id} className="col-4 col-md-3">
              <div className="card m-2">
                <img src={mov.poster} className="card-img-top" alt={mov.title} width={50} height={200} />
                <div className="card-body">
                  <h5 className="card-title">{mov.title}</h5>
                </div>
              
                <div className='card-contents'>
                  <p><strong>Director:</strong>{mov.director}</p>
                  <p><strong>Year:</strong>{mov.year}</p>
                  <p><strong>Rating:</strong>{mov.rating}</p>
                  <p><strong>Language:</strong>{mov.language}</p>
                </div>
              </div>

            </div>
            
          ))
        ) : (
          <h1 className="end">No movies found</h1>
        )}
      </div>
    </div>
  );
}

export default App;
