import React, { useState } from "react";
import IGenre from "../../model/IGenre";
import styles from "./GenreWindow.module.scss";

interface INewGenreProps {
    genres: IGenre[];
    type: number;

    onGenreCreated: (genre: IGenre) => void;
    onGenreDeleted: (genre: IGenre) => void;
}

const GenreWindow: React.FC<INewGenreProps> = ({ onGenreCreated, onGenreDeleted, genres, type }) => {
    const [ genreName, setGenreName ] = useState<string>("");
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenreName(e.target.value);
        setErrorMessage("");
    }

    /**
     * Handler that checks for given name in genres list and then sends new genre object to parent handler
     */
    const saveHandler = () => {
        const newGenre: IGenre = {
            id: -1,
            name: genreName,
        }

        const index = genres.findIndex(g => g.name === newGenre.name);
        if (index !== -1){
            setErrorMessage("Genre already exists!");
            return;
        }
        onGenreCreated(newGenre);
    }

    /**
     * Handler that checks for given genre name in genres list and then sends found genre object to parent handler
     */
    const deleteHandler = () => {
        const index = genres.findIndex(g => g.name === genreName);
        if (index === -1){
            setErrorMessage("Genre doesn't exist!");
            return;
        }
        onGenreDeleted(genres[index]);
    }

    return(
        <>
            <div className={`${styles.window}`}> 
                <form className={`${styles.content}`}>
                    <label className={`${styles.title}`}>
                        {type === 1 ? "Create genre" : "Delete genre"}
                    </label>
                    <input className={`${styles.genreInput}`} type="text" id="genreName" placeholder="Enter name" name="genre" value={genreName} onChange={inputChangeHandler}/>
                    <div className={`${styles.container}`}>
                        <label className={`${styles.error}`}>{errorMessage}</label>
                    </div>
                    {type === 1 ? 
                        <button className={`btn btn-outline-dark ${styles.confirm}`} type="button" onClick={saveHandler}>Save</button> :
                        <button className={`btn btn-outline-dark ${styles.confirm}`} type="button" onClick={deleteHandler}>Delete</button>  
                    }
                </form>
            </div>
        </>
    );
}

export default GenreWindow;