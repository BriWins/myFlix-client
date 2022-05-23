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
    axios.get("https://afternoon-ravine-04592.herokuapp.com/movies")
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);

  }

    getMovies(token) {
      axios.get("https://afternoon-ravine-04592.herokuapp.com/movies", {
        headers: {Authorization: 'Bearer ${token}'}
      })
      .then( response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
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