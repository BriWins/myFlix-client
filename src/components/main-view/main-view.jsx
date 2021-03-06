import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount(){
    axios.get("https://peaceful-sierra-49110.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? ( <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
        }} />) 
        : (
          movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
          }}/>
        ))
        )}
      </div>
    );
  }
}