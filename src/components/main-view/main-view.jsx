import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Menu from "../Menu/Menu";

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
   

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Menu user={user} />
        <Container>
        <Row className="main-view justify-content-md-center">
          <Route path="/register" render={() => {
          if (user) return <Redirect to="/" /> 
          return 
        <Col lg={8} md={8}>
          <RegistrationView/>
        </Col>
        }} />

          <Route exact path="/" render ={ () => {
             if (!user) return 
            
               <Col>
               <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
               </Col>
               if ( movies.length === 0) return <div className="main-view" />;
            
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieID)} 
              onBackClick={() => history.goBack()} />
            </Col>
          }} />

      <Route exact path="/directors/:names" render={({ match }) => {
        if ( movies.length === 0) return <div className="main-view" />;
      return <Col md={8}>
        <DirectorView director={movies.find(m => m.Director.Name === match.params.names).Director} onBackClick={() => history.goBack()}/>
      </Col>
    }
    } /> 

      <Route exact path="/genres/:genres" render={({ match, history }) => {
        if ( movies.length === 0) return <div className="main-view" />;
      return <Col md={8}>
        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
      </Col>
    }
  } />
      <Route exact path={"/users/${user}"} render={({ match, history }) => {
        if (!user) return <Redirect to="/"/>
      return <Col>
        <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />      
        </Col>
    }
    } /> 
    <Route path={"/user-update/${user}"} render={({ match, history }) => {
      if (!user) return <Redirect to="/"/>
      return <Col>
        <UserUpdate user={user} onBackClick={() => history.goBack()} />      
        </Col>
    }} />
    
        </Row>
        </Container>
      </Router>
    )
  }
}

