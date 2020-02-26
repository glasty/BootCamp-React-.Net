import React from "react";
import styles from "./MovieDisplay.module.scss";
import IMovie from "../../model/IMovie";

interface IMovieDisplayProps {
  movie: IMovie;

  onMovieEdit: (movie: IMovie) => void;
}

/*
 * Component for displaying information about particular movie, that is passed in props.
 */
const MovieDisplay: React.FC<IMovieDisplayProps> = ({ movie, onMovieEdit }) => {
  /*
   * Handler for starting edit mode. This component only sends information about desire to enter edit mode to parent component.
   */
  const movieEditHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    onMovieEdit(movie);
  };

  return (
    <>
      <div className="card-header">{movie.title}</div>
      <div className="card-body" style={{ padding: "15px" }}>
        <div className={`${styles.movieDetails} row`}>
          <div className="col-6" style={{ paddingRight: "7px" }}>
            <img src={movie.thumbnailUrl} className={styles.movieThumbnail} alt={movie.title} />
          </div>
          <div className="col-6" style={{ paddingLeft: "7px" }}>
            <table className={`${styles.movieGenres} table table-sm`}>
              <tbody>
                <tr>
                  <th>Year:</th>
                  <td>{movie.year}</td>
                </tr>
                <tr>
                  <th>Genres:</th>
                  <td>
                    <ul>
                      {movie.genres.map(g => (
                        <li key={g.id}>{g.name}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row justify-content-between" style={{marginLeft: 4, marginRight: 4}}>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            data-movie-id={movie.id.toString()}
            onClick={movieEditHandler}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieDisplay;
