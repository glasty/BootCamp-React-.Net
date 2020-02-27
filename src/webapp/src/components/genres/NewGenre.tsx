import React, { useState } from "react";
import IGenre from "../../model/IGenre";
import styles from "./NewGenre.module.scss";

interface INewGenreProps {
    genres: IGenre[];

    onGenreCreated: (genre: IGenre) => void;
}

const NewGenre: React.FC<INewGenreProps> = ({ onGenreCreated, genres }) => {
    const [ genreName, setGenreName ] = useState<string>("");
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenreName(e.target.value);
        setErrorMessage("");
    }

    /**
     * Handler for saving the genre
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

    return(
        <>
            <div className={`${styles.window}`}>
                <label className={`${styles.title}`}>Genre name</label>
                <div className={`row ${styles.editRow}`}> 
                    <input className={`form-control col-10 ${styles.genreInput}`} type="text" id="genreName" name="genre" value={genreName} onChange={inputChangeHandler}/>
                    <button className={`btn btn-outline-dark col-2 ${styles.confirm}`} type="button" onClick={saveHandler}>Save</button>
                </div>
                <label style={{color: "#FF0000", backgroundColor: "#dfe5ff", width: "100%"}}>{errorMessage}</label>
            </div>
        </>
    );
}

export default NewGenre;