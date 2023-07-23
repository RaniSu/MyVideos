import React, { useState } from "react";
import Axios from "axios";
import MovieComponent from "../../components/MovieComponent";
import MovieInfoComponent from "../../components/MovieInfoComponent";
import "./Home.css"; // Import the CSS file

export const API_KEY = "a9118a3a";

function Home() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  
  return (
    <div className="Container">
      <div className="Header">
      
        <div className="SearchBox">
          <img
            className="SearchIcon"
            src="/react-movie-app/search-icon.svg"
            alt="Search"
          />
          <input
            className="SearchInput"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </div>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <div className="MovieListContainer">
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <img
            className="Placeholder"
            src="/react-movie-app/movie-icon.svg"
            alt="No movie found"
          />
        )}
      </div>
    </div>
  );
}

export default Home;