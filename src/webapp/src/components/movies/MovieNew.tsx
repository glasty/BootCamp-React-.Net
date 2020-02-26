import React, { useState } from "react";
import styles from "./MovieNew.module.scss";
import IMovie from "../../model/IMovie";
import IGenre from "../../model/IGenre";

interface IMovieNewProps {
    movie: IMovie;
    genres: IGenre[];

    onMovieSave: (movie: IMovie) => void;
    onMovieDiscard: (movie: IMovie) => void;
}

const MovieNew: React.FC<IMovieNewProps> = ({ movie, genres, onMovieSave, onMovieDiscard}) => {
    const [newMovie, setNewMovie] = useState<IMovie>({ ...movie });

    /*
    * Handler for saving movie. Passes signal to parent component.
    */
    const movieSaveHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        onMovieSave(newMovie);
    };

    /*
    * Handler for discarting changes made in edit mode. Passes signal to parent component
    */
    const movieDiscardHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        onMovieDiscard(newMovie);
    }

    /*
    * Handler for selecting movie genres, function adds or removes id from editedMovie.genres array
    */
    const genreClickHandle = (id : number) => {
        
        setNewMovie(prevState => {     
        const newState: IMovie = { ...prevState }; 
        const indexInMovie = newMovie.genres.map(g => g.id).indexOf(id);

        //Adding the genre from movie list
        if (indexInMovie === -1){
            //Find object index in array with all genders
            const objectIndex: number = genres.map(g => g.id).indexOf(id);
            
            //Add the genre
            const newlyAddedGenre: IGenre = genres[objectIndex];
            newState.genres = newState.genres.concat(newlyAddedGenre);
        }
        //Deleting the genre to movie list
        else{
            newState.genres = newState.genres.filter(g => g.id !== id);       
        }

        return newState as IMovie;
        });
    };

    /*
    * Handler for managing changes in <input> elements and incorporating these into new movie.
    */
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        let value: string | number = e.target.value;

        setNewMovie(prevState => {
        const newState: any = { ...prevState };
        newState[name] = value;
        return newState as IMovie;
        });
    };

    return (       
        <>
            <div className="card-header">{movie.title}</div>
            <div className="card-body" style={{ padding: "15px" }}>
                <div className="row">
                <div className="col-6" style={{margin: "0px"}}>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="tbxMovieName">Title</label>
                        <input
                        className="form-control"
                        type="text"
                        id="tbxMovieName"
                        name="title"
                        value={newMovie.title}
                        onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tbxYear">Year</label>
                        <input
                        className="form-control"
                        type="number"
                        id="tbxYear"
                        name="year"
                        value={newMovie.year}
                        onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tbxThumbnailUrl">ThumbnailUrl</label>
                        <input
                        className="form-control"
                        type="text"
                        id="tbxThumbnailUrl"
                        name="thumbnailUrl"
                        value={newMovie.thumbnailUrl}
                        onChange={inputChangeHandler}
                        />
                    </div>
                    </form>
                </div> 
                <div className="col-5">
                    <label>Genre</label>
                    <ul style={{paddingInlineStart: "5px"}}>
                    {genres.map(g => (
                        <li key={g.id} id={`${styles.genreItem}`} onClick={() => genreClickHandle(g.id)} style={{backgroundColor: newMovie.genres.map(gen => gen.id).indexOf(g.id) === -1 ? "#f2f2f2" : "#b3e6ff"}}>{g.name}</li>
                    ))}
                    </ul>            
                </div>      
                </div>
                
            </div>
            <div className="card-footer">
                <div className="row justify-content-between" style={{marginLeft: 4, marginRight: 4}}>
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-movie-id={movie.id.toString()}
                    onClick={movieSaveHandler}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    data-movie-id={movie.id.toString()}
                    onClick={movieDiscardHandler}
                >
                    Discard
                </button>
                </div>
            </div>
        </>
    );
}

export default MovieNew;
