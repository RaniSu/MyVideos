import React, { useEffect, useState } from "react";
import { projectFirestore, projectAuth } from "../../firebase/config";
import MovieComponent from "../../components/MovieComponent";
import "./favorite.css"; // Import the CSS file
const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [selectedType, setSelectedType] = useState("movie"); // Default to "movie"

  useEffect(() => {
    const user = projectAuth.currentUser;
    if (user) {
      const favoriteRef = projectFirestore.collection("favorites").doc(user.uid);
      const unsubscribe = favoriteRef.onSnapshot((snapshot) => {
        const favoriteData = snapshot.data();
        if (favoriteData) {
          setFavoriteMovies(favoriteData.movies || []);
        } else {
          setFavoriteMovies([]);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const filteredMovies = favoriteMovies.filter(
    (movie) => movie.Type === selectedType
  );

  return (
    <div className="Container">
      <h2>Favorites</h2>
     
      <div className="TypeSelector">
        
        <button
          onClick={() => handleTypeChange("movie")}
          className={`TypeButton ${selectedType === "movie" ? "active" : ""}`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTypeChange("series")}
          className={`TypeButton ${selectedType === "series" ? "active" : ""}`}
        >
          Series
        </button>
      </div>
      <div className="MovieListContainer">
        {filteredMovies.length ? (
          filteredMovies.map((movie) => (
            <MovieComponent
              key={movie.imdbID}
              movie={movie}
              isFavorite={true} // Set isFavorite prop to true for favorite movies
            />
          ))
        ) : (
          <p>No {selectedType === "movie" ? "movie" : "series"} favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
