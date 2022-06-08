import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UserUpdate } from "../profile-view/update-view";
import { MenuBar } from "../navbar/navbar";

import { Row, Col, Container, Nav, Navbar } from "react-bootstrap/";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      users: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        users: localStorage.getItem("users"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get(`https://glacial-shore-06302.herokuapp.com/movies`, {
        headers: { Authorization: "Bearer ${token}" },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      users: authData.users.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("users", authData.users.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, users } = this.state;
    return (
      <Router>
         <MenuBar users={users} />
        <Container>
          

         
        <Row className="main-view justify-content-md-center">

         
            <Route
              exact
              path="/"
              render={() => {
                if (!users)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(users) => this.onLoggedIn(users)} />
                    </Col>
                  );
                return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movies={m} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (users) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match }) => {
                if (!users) return (
                <Col>
                  <LoginView onLoggedIn={(users) => this.onLoggedIn(users)} />
                </Col>
                );
                return (
                  <Col md={8}>
                    <MovieView
                      movie={
                        movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/directors/:names"
              render={({ match }) => {
                if (!users) return(
                <Col>
                  <LoginView onLoggedIn={(users) => this.onLoggedIn(users)} />
                </Col>
                );
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.names
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/genres/:genres"
              render={({ match, history }) => {
                if (!users) 
                return (
                <Col>
                  <LoginView onLoggedIn={(users) => this.onLoggedIn(users)} />
                </Col>
                );
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path={`/users/${users}`}
              render={({ match, history }) => {
                if (!users) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      users={users}
                      history={history}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}