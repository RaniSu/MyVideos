import React, { useState } from "react";
import "./MovieComponent.css"; // Import the CSS file
import { projectFirestore,projectAuth } from "../firebase/config";

const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  const truncatedTitle = Title.length > 22 ? Title.slice(0, 22) + "..." : Title;
  const [isFavorite, setIsFavorite] = useState(props.isFavorite || false); 

  const toggleFavorite = async () => {
    const user = projectAuth.currentUser;
    if (!user) {
      // Handle the case when the user is not signed in
      return;
    }

    const favoriteRef = projectFirestore.collection("favorites").doc(user.uid);
    const favoriteSnapshot = await favoriteRef.get();
    const favoriteData = favoriteSnapshot.data();

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favoriteData?.movies.filter(
        (movie) => movie.imdbID !== imdbID
      );
      await favoriteRef.update({
        movies: updatedFavorites,
      });
      setIsFavorite(false);
    } else {
      // Add to favorites
      const newMovie = props.movie;
      await favoriteRef.set(
        {
          movies: [...(favoriteData?.movies || []), newMovie],
        },
        { merge: true }
      );
      setIsFavorite(true);
    }
  };
  

  return (
    <div className="MovieContainer">
      <img className="CoverImage" src={Poster} alt={Title} />
      <span className="MovieName">{truncatedTitle}</span>
      <div className="InfoColumn">
        <span className="MovieInfo">Year: {Year}</span>
        <span className="MovieInfo">Type: {Type}</span>
      </div>
      <button className="FavoriteIcon" onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieComponent;
