import React from "react";
import { Card, Row, Container, Col, Link, Button  } from "react-bootstrap/";

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          <Card>
            <Card.Body>
            <Card.Img crossorigin="anonymous" src={movie.ImgPath} className="movie-image"/>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text> {movie.Description} </Card.Text>
            <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
            </Link>
            </Card.Body>
      <button onClick={() => { onBackClick(null);}}> Back </button>
      
      </Card>
      </Col>
      </Row>
      </Container>
    );
  }

 


}