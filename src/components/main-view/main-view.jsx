import React from "react";
import axios from "axios";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Black Panther",
          Description:
            "American superhero film based on the Marvel Comics character, Black Panther, depicted as the king and protector of the fictional African nation of Wakanda.",
          ImgPath:
            "https://i.pinimg.com/originals/b8/ce/c7/b8cec7d7e348590d72a70c9441fc73e5.jpg",
        },
        {
          _id: 2,
          Title: "Mad Max: Fury Road",
          Description:
            "In a post-apocalyptic desert wasteland, Fury Road follows Max Rockatansky to flee from cult leader Immortan Joe and his army.",
          ImgPath:
            "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        },
        {
          _id: 3,
          Title: "Lady Bird",
          Description:
            "A teenager navigates a loving, but turbulent relationship with her mother during her eventful senior year of high school.",
          ImgPath:
            "https://m.media-amazon.com/images/M/MV5BODhkZGE0NDQtZDc0Zi00YmQ4LWJiNmUtYTY1OGM1ODRmNGVkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        },
      ],
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

  render() {
    const { movies, selectedMovie } = this.state;

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