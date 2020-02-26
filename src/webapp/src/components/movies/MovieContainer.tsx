import React, { useState } from "react";
import styles from "./MovieContainer.module.scss";
import IMovie from "../../model/IMovie";
import IGenre from "../../model/IGenre";
import MovieEdit from "./MovieEdit";
import MovieDisplay from "./MovieDisplay";
import MovieNew from "./MovieNew";

interface IMovieContainerProps {
  movie: IMovie;
  genres: IGenre[];

  onMovieSave: (movie: IMovie) => void;
  saveMode: (id: number) => void;
  onMovieDelete: (movie: IMovie) => void;
}

/*
 * Compoment for displaying movie card including movie name, thumbnail image and other attributes.
 * Determines if movie should be in edit mode or displayed only.
 */
const MovieContainer: React.FC<IMovieContainerProps> = ({ movie, onMovieSave, saveMode, genres, onMovieDelete }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  /*
   * Event handler for saving movie, it is passed to underlying component (<MovieEdit />).
   * It also turns of edit mode.
   */
  const saveMovieHandler = (movie: IMovie) => {
    onMovieSave(movie);
    setEditMode(false);
    saveMode(movie.id);
  };

  /*
    * Event handler for discarting changes 
    */
  const discardMovieHandler = (movie: IMovie) => {
    setEditMode(false);
    saveMode(movie.id);
  }

  /*
   * Event handler for starting movie editing. Sets flag 'editMode' and that "switches" rendered component from <MoveDisplay /> to <MovieEdit />.
   */
  const editMovieHandler = (movie: IMovie) => {
    setEditMode(true);
    saveMode(movie.id);
  };

  /*
   * Event handler for discarting changes and removing card
   */
  const removeMovieHandler = (movie: IMovie) => {
    onMovieDelete(movie);
  }

  return (
    <div className={`card ${styles.movieContainer}`}>
      {movie.id > 0 ? (editMode ? (
        <MovieEdit movie={movie} genres={genres} onMovieSave={saveMovieHandler} onMovieDiscard={discardMovieHandler}/>
      ) : (
        <MovieDisplay movie={movie} onMovieEdit={editMovieHandler} /> 
      )) : <MovieNew movie={movie} genres={genres} onMovieSave={saveMovieHandler} onMovieDiscard={removeMovieHandler}/>}      
    </div>
  );
};

export default MovieContainer;
