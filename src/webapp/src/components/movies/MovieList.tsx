import React, { useState } from "react";
import "./MovieList.module.scss";
import IMovie from "../../model/IMovie";
import MovieContainer from "./MovieContainer";
import IGenre from "../../model/IGenre";

interface IMovieListProps {
  movies: IMovie[];
  genres: IGenre[];

  onMovieSave: (movie: IMovie) => void;
  onMovieDelete: (movie: IMovie) => void;
}

/*
 * Component displaying collection (list) of movies. It iterates over movies and renders <MovieContainer> component for each of them.
 * Notice that every dynamically created component should have its unique key (<div key={...} /> in this case).
 * It is also worth of noticing that layout of components is made responsible via Bootstrap grid system.
 */
const MovieList: React.FC<IMovieListProps> = ({ movies, genres, onMovieSave, onMovieDelete }) => {
  const [ editList, setEditList ] = useState<Array<number>>([]);

  /*
   * Handler that adds card.id to editList -> when in edit mode width of the movie card is bigger
   */
  const modeHandler = (id : number) =>
  {
    editList.indexOf(id) === -1 ? setEditList(editList.concat(id)) : setEditList(editList.filter(i => i !== id));   
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {movies.map(m => (
            <div key={m.id} className={editList.indexOf(m.id) === -1 && m.id > 0 ? "col-xl-4 col-lg-6 col-sm-12" : "col-xl-8 col-lg-12 col-sm-12"}>
              <MovieContainer movie={m} genres={genres} onMovieSave={onMovieSave} saveMode={modeHandler} onMovieDelete={onMovieDelete}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
