import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoadingTrendingMovies, setIsLoadingTrendingMovies] = useState(false);
  const [trendingMoviesErrorMessage, setTrendingMoviesErrorMessage] =
    useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const ACCESS_TOKEN = import.meta.env.VITE_TMBD_ACCESS_TOKEN;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response == "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error occurred while fetching movies ${error}`);
      setErrorMessage(
        "Error occurred while fetching movies. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    setIsLoadingTrendingMovies(true);
    setTrendingMoviesErrorMessage("");
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
      setTrendingMoviesErrorMessage(
        "Error occurred while fetching trending movies. Please try again later."
      );
    } finally {
      setIsLoadingTrendingMovies(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero-img" />
          <h1>
            Escape into a world of endless{" "}
            <span className="text-gradient">entertainment</span> 🎬🍿
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="trending">
          <h2>Top Searches</h2>

          {isLoadingTrendingMovies ? (
            <Spinner />
          ) : trendingMoviesErrorMessage ? (
            <p className="text-red-500">{trendingMoviesErrorMessage}</p>
          ) : (
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1} </p>
                  <img
                    src={movie.posterUrl ? movie.posterUrl : "./no-movie.png"}
                    alt={movie.searchTerm}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
