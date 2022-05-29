import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { RegistrationView } from "../registration-view/registration-view";

import { Row, Col } from "react-bootstrap/"

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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
      axios.get("https://stark-oasis-54313.herokuapp.com/movies", {
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
    const { movies, user } = this.state;
    if (!user) return 
    <Row>
      <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
      </Col>
    </Row>

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render ={ () => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieID)} />
            </Col>
          }} />

      <Route exact path="/directors/:names" render={({ match }) => {
        if ( movies.length === 0) return <div className="main-view" />;
      return <Col md={8}>
        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
      </Col>
    }
    } /> 

      <Route exact path="/genres/:genres" render={({ match }) => {
        if ( movies.length === 0) return <div className="main-view" />;
      return <Col md={8}>
        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
      </Col>
    }
    } /> 
    
        </Row>
      </Router>
    )
  }
}

