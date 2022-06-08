import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from "react-bootstrap/";

import './profile-view.scss';

export function FavoriteView(props) {
  const { movies, favoriteMovies, currentUser, token } = props;
        const favoriteMoviesId = favoriteMovies.map(m => m._id);
        const favoriteMoviesList = movies.filter(m => {
    return favoriteMoviesId.includes(m._id)
})

  const handleMovieDelete = (movieId) => {
    axios.delete(`https://stark-oasis-54313.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was successfully deleted.`)
      window.open('/users/:Username', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Fragment>
      {favoriteMoviesList.length === 0 ? (
        
          <p>You have not added any favorite movies yet.</p>
       
          ) : (
            favoriteMoviesList.map((movies) => {
              return (
              <Col xs={10} sm={8} md={6} lg={4} >
                <Card id="movie-card">
                  <Link to={`/movies/${movies._id}`}>
                    <Card.Img variant="top" src={movies.ImgPath} />
                  </Link>
                  <Card.Body>
                      <Card.Title>{movies.Title}</Card.Title>
                      <Card.Text>{movies.Description}</Card.Text>
                        <Link to={`/movies/${movies._id}`}>
                          <Button className="button" variant="outline-primary" size="sm">Open</Button>
                        </Link>
                        <Button   
                        className="button ml-2" 
                        variant="outline-primary" 
                        size="sm" onClick={()=> {handleMovieDelete(movies._id)}} >
                          Remove
                        </Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })
          )
        }
    </Fragment>
  )
}