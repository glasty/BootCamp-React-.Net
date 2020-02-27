import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import IMovie from "../../../model/IMovie";
import IGenre from "../../../model/IGenre";
import MovieRepository from "../../../api/moviesRepository";
import MovieList from "../../movies/MovieList";
import GenreRepository from "../../../api/genresRepository";
import NewGenre from "../../genres/NewGenre";

/*
 * "Root" component that encapsulates whole application. State is managed on this level
 * until we accommodate more elegant solution like Redux or MobX.
 */
const App: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [menuPanel, setMenuPanel] = useState<number>(0);
  const [genreWindow, setGenreWindow] = useState<boolean>(false);

  /*
   * Hook for loading data. Function fetchData() was made async to simplify loading data via MovieRepostiory and GenreRepository.
   */
  useEffect(() => {
    const fetchData = async () => {
      const repoM = new MovieRepository();
      const repoG = new GenreRepository();

      const loadedMovies = await repoM.getAll();
      setMovies(loadedMovies);

      const loadedGenres = await repoG.getAll();
      setGenres(loadedGenres);
    };

    fetchData();
  }, []);

  /*
   * Handler for saving data (movie). Sending of updated to WebAPI should be made here...
   */
  const saveMovieHandler = (movie: IMovie) => {
    console.log(`[App]: Saving movie...`);

    // Year from string to number
    let newMovieVal = movie;
    newMovieVal.year = Number(movie.year);
    const upData = () => {
      const repo = new MovieRepository();

      return repo.save(newMovieVal);      
    }    

    //After server response update data
    upData().then((response) => {
      //Save changes if editing existing movie or delete movie from local movie list if movie is being created 
      setMovies(prevState => {       
        let newState = [...prevState];
        //Find movie in local movie list 
        const index = prevState.findIndex(m => m.id === movie.id);
        if (index > -1) {
          if (newState[index].id > 0){
            newState.splice(index, 1, { ...movie });
          }else{
            //Delete local record of newly created movie with index < 0
            newState = newState.filter(m => m.id !== movie.id);
            //Replace it with response from server with correct id given by the server
            newState = newState.concat(response);
          }
          
        }
        return [...newState];
      });
    });
    
  };

  /**
   * Handler for adding new movie 
   */
  const addMovieHandler = () => {
    const id: number = Math.min( ...movies.map(m => m.id) ) - 1;

    const newMovie: IMovie = { 
      id: id,
      title: "",
      year: 2020,
      thumbnailUrl: "",
      genres: []
     }
    
    setMovies(prevState => prevState.concat(newMovie));

  }

  /*
   * Handler for deleting the movie in API and SPA
   */
  const deleteMovieHandler = (movie: IMovie) => {
    //Movie is not saved on server site yet delete localy
    if (movie.id <= 0){
      setMovies(prevState => prevState.filter(m => m.id !== movie.id));
    }
  }

  const saveNewGenreHandler = (newGenre: IGenre) => {
    const upData = () => {
      const repo = new GenreRepository();

      return repo.save(newGenre);
    }

    upData().then(response => {
      setGenres(prevState => prevState.concat(response));
    })
  }

  return (
    <div>      
        <div className={`${styles.sideMenu}`} style={{width: menuPanel}}>
          <span className={`${styles.closeButton}`} onClick={() => {setMenuPanel(0); setGenreWindow(false)}}>x</span>

          <button type="button" className={`${styles.sideButtonMenu}`} onClick={addMovieHandler}>Add Movie</button>
          <button type="button" onClick={() => setGenreWindow(prevState => {return !prevState})} className={`${styles.sideButtonMenu}`}>Add Genre</button>
          <button type="button" className={`${styles.sideButtonMenu}`}>Add Actor</button>
        </div>
        {genreWindow ? <NewGenre onGenreCreated={saveNewGenreHandler} genres={genres}></NewGenre> : <></>}
        
        <button type="button" onClick={() => {setMenuPanel(150)}} style={{width: menuPanel === 0 ? 100 : 0, paddingLeft: menuPanel === 0 ? 15 : 0, paddingRight: menuPanel === 0 ? 15 : 0}} className={`${styles.button}`} ><span>Options</span></button>
      
      <div className={`${styles.main}`}>
        <MovieList movies={movies} genres={genres} onMovieSave={saveMovieHandler} onMovieDelete={deleteMovieHandler}/>
      </div>
    </div>
    
  );
};

export default App;
