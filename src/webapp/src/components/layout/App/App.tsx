import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import IMovie from "../../../model/IMovie";
import IGenre from "../../../model/IGenre";
import MovieRepository from "../../../api/moviesRepository";
import MovieList from "../../movies/MovieList";
import GenreRepository from "../../../api/genresRepository";
import GenreWindow from "../../genres/GenreWindow";
import ActorList from "../../actors/ActorList";
import IActor from "../../../model/IActor";
import ActorRepository from "../../../api/actorsRepository";

/*
 * "Root" component that encapsulates whole application. State is managed on this level
 * until we accommodate more elegant solution like Redux or MobX.
 */
const App: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [actors, setActors] = useState<IActor[]>([]);
  const [menuPanel, setMenuPanel] = useState<number>(0);
  const [genreWindow, setGenreWindow] = useState<number>(0);
  const [topPopUpWindow, setTopPopUp] = useState<number>(0);
  const [topPopUpMessage, setTopPopUpMessage] = useState<string>("");
  const [topPopUpColor, setTopPopUpColor] = useState<string>("");
  const [navigation, setNav] = useState<string>("Movies");
  
  /*
   * Hook for loading data. Function fetchData() was made async to simplify loading data via MovieRepostiory and GenreRepository.
   */
  useEffect(() => {
    const fetchData = async () => {
      const repoM = new MovieRepository();
      const repoG = new GenreRepository();
      const repoA = new ActorRepository();

      const loadedMovies = await repoM.getAll();
      setMovies(loadedMovies);

      const loadedGenres = await repoG.getAll();
      setGenres(loadedGenres);

      const loadedActors = await repoA.getAll();
      setActors(loadedActors);
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
          //ID > 0 - changing existing movie
          if (newState[index].id > 0){
            newState.splice(index, 1, { ...movie });
          //ID < 0 - creating new movie
          }else{
            //Delete local record of newly created movie with id < 0
            newState = newState.filter(m => m.id !== movie.id);
            //Replace it with response from server with correct id given by the server
            newState = newState.concat(response);
            showInfo("Movie created", "#2e8b57");
          }
          
        }
        return [...newState];
      });
    });
    
  };

  /**
   * Handler for adding new empty movie 
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

  /**
   * Handler for saving new genre in API and SPA
   * @param newGenre genre to be saved
   */
  const saveNewGenreHandler = (newGenre: IGenre) => {
    const upData = () => {
      const repo = new GenreRepository();

      return repo.save(newGenre);
    }

    upData().then(response => {
      setGenres(prevState => prevState.concat(response));
      
      //Show PopUpWindow
      showInfo("Genre created", "#2e8b57");
    })
  }


  /**
   * Handler for deleting genre in API and SPA
   * @param genre genre to be deleted 
   */
  const deleteGenreHandler = (genre: IGenre) => {
    //Check if genre is used in movies - HT? movies.filter(function that returns true or false if given movie contains given genre)
    const result = movies.filter((movie) => {return movie.genres.findIndex(g => g.id === genre.id) !== -1});
    if(result.length !== 0){
      //Show PopUpWindow
      showInfo("Genre is being used", "#8b752e");
      return;
    }
    
    const upData = () => {
      const repo = new GenreRepository();

      return repo.delete(genre);
    }
   
    upData().then(response => {
      if (response.status === 200){
        const index = genres.findIndex(g => g.id === genre.id);
        
        setGenres(prevState => {
          prevState.splice(index, 1); 
          return prevState;
        });

        //Show PopUpWindow
        showInfo("Genre deleted", "#8b2e2e");  
      }
    })
  }

  /**
   * Handler for resolwing if delete/create genre window should be visible
   * @param type type of the pressed button 
   */
  const genreButtonClickHandler = (type: number) => {
    if (type === genreWindow){
      setGenreWindow(0);
    }else{
      setGenreWindow(type); 
    }
  }

  /**
   * Function to show top pop up info window
   * @param message Message to be displayed
   * @param color Color of the window
   */
  const showInfo = (message: string, color: string) => {
    if (topPopUpWindow === 0){
      setTopPopUp(45);
      setTopPopUpMessage(message);
      setTopPopUpColor(color);
      setTimeout(() => {setTopPopUp(0)}, 3000);
    }
  }

  return (
    <div>      
      <button type="button" onClick={() => {setMenuPanel(150)}} style={{width: menuPanel === 0 ? 100 : 0, paddingLeft: menuPanel === 0 ? 15 : 0, paddingRight: menuPanel === 0 ? 15 : 0}} className={`${styles.button}`} ><span>Options</span></button>
      <div className={`${styles.sideMenu}`} style={{width: menuPanel}}>
        <span className={`${styles.closeButton}`} onClick={() => {setMenuPanel(0); genreButtonClickHandler(0)}}>x</span>

        <button type="button" className={`${styles.sideButtonMenu}`} onClick={addMovieHandler}>Add Movie</button>
        <button type="button" onClick={() => genreButtonClickHandler(1)} className={`${styles.sideButtonMenu}`}>Add Genre</button>
        <button type="button" onClick={() => genreButtonClickHandler(2)} className={`${styles.sideButtonMenu}`}>Delete Genre</button>
        <button type="button" className={`${styles.sideButtonMenu}`}>Add Actor</button>        
      </div>
      {genreWindow ? 
        <GenreWindow type={genreWindow} onGenreCreated={saveNewGenreHandler} onGenreDeleted={deleteGenreHandler} genres={genres}/> : 
        <></>
      }

      <div className={`${styles.topPopUp}`} style={{height: topPopUpWindow, backgroundColor: topPopUpColor}}>
        <label className={`${styles.topPopUpText}`} style={{height: topPopUpWindow}}>{topPopUpMessage}</label>
      </div>
      

      <ul className={`nav nav-tabs ${styles.navBar}`}>
        <li className="nav-item">
          <a className={navigation === "Movies" ? `nav-link active ${styles.navItem}` : `nav-link ${styles.navItem}`} href="#" onClick={() => setNav("Movies")}>Movies</a>  
        </li>
        <li className="nav-item">
          <a className={navigation === "Actors" ? `nav-link active ${styles.navItem}` : `nav-link ${styles.navItem}`} href="#" onClick={() => setNav("Actors")}>Actors</a>
        </li>
      </ul>

      <div className={`${styles.main}`}>
        { navigation === "Movies" ? 
          <MovieList movies={movies} genres={genres} onMovieSave={saveMovieHandler} onMovieDelete={deleteMovieHandler}/> : 
          <ActorList actors={actors} movies={movies}/>
        }
        
      </div>
    </div>
    
  );
};

export default App;
