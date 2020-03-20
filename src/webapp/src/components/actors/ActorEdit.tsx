import React, { useState } from "react";
import IActor from "../../model/IActor";
import IMovie from "../../model/IMovie";

interface IActorEditProps {
    actor: IActor;
    movies: IMovie[];

    onActorSave: (actor: IActor) => void;
    onActorDiscard: (actor: IActor) => void;
}


const ActorEdit: React.FC<IActorEditProps> = ({ actor, movies, onActorDiscard, onActorSave }) => {
    const [ editedActor, setEditedActor ] = useState<IActor>(actor);

    /*
    * Handler for saving actor. Passes signal to parent component.
    */
    const actorDiscardHandler = () => {
        console.log(editedActor);
        onActorDiscard(editedActor);

    };

    const actorSaveHandler = () => {
        onActorSave(editedActor);
    }

    const dateInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        var value: string | number = e.target.value;

        if(value.length == 1){
            value = "0".concat(value);
        }

        var date = editedActor.birthDate.split(/T|-/);
        
        console.log("Before", date);

        switch(name){
            case "birthDay":
                date[2] = value;
                break;
            case "birthMonth":
                date[1] = value;
                break;
            case "birthYear":
                date[0] = value;
                break;
        }

        console.log("After", date);

        setEditedActor(prevState => {
            const newState: any = { ...prevState };
            var newDate = "";
            newState["birthDate"] = newDate.concat(date[0], "-", date[1], "-", date[2], "T", date[3]);
            return newState;
        })

        console.log(editedActor);
        

    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        let value: string | number = e.target.value;

        setEditedActor(prevState => {
           const newState: any = { ...prevState };
           newState[name] = value;
           return newState as IActor;
        });
    };

    return (
        <>
            <div className="card-header">{actor.firstName} {actor.middleName} {actor.lastName}</div>
            <div className="card-body" style={{ padding: "15px" }}>
                <div className="row">
                <div className="col-6" style={{margin: "0px"}}>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="tbxActorFirstName">First Name</label>
                        <input
                        className="form-control"
                        type="text"
                        id="tbxFirstName"
                        name="firstName"
                        value={editedActor.firstName || ""}
                        onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tbxActorFirstName">Middle Name</label>
                        <input
                        className="form-control"
                        type="text"
                        id="tbxMiddleName"
                        name="middleName"
                        value={editedActor.middleName || ""}
                        onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tbxActorLastName">Last Name</label>
                        <input
                        className="form-control"
                        type="text"
                        id="tbxlastName"
                        name="lastName"
                        value={editedActor.lastName || ""}
                        onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <label htmlFor="tbxYear">Year</label>
                            <input
                            className="form-control"
                            type="number"
                            id="tbxYear"
                            name="birthYear"
                            value={editedActor.birthDate.split(/-|T/)[0]}
                            onChange={dateInputChangeHandler}
                            />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="tbxMonth">Month</label>
                            <input
                            className="form-control"
                            type="number"
                            id="tbxMonth"
                            name="birthMonth"
                            value={editedActor.birthDate.split(/-|T/)[1]}
                            onChange={dateInputChangeHandler}
                            />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="tbxDay">Day</label>
                            <input
                            className="form-control"
                            type="number"
                            id="tbxDay"
                            name="birthDay"
                            value={editedActor.birthDate.split(/-|T/)[2]}
                            onChange={dateInputChangeHandler}
                            />
                        </div>
                    </div>
                    
                    </form>
                </div> 
                <div className="col-5">
                    <label>Movies</label>
                    <ul style={{paddingInlineStart: "5px"}}>
                    {/* {movies.map(g => (
                        <li key={g.id} id={`${styles.genreItem}`} onClick={() => genreClickHandle(g.id)} style={{backgroundColor: editedMovie.genres.map(gen => gen.id).indexOf(g.id) === -1 ? "#f2f2f2" : "#b3e6ff"}}>{g.name}</li>
                    ))} */}
                    </ul>            
                </div>      
                </div>
                
            </div>
            <div className="card-footer">
                <div className="row justify-content-between" style={{marginLeft: 4, marginRight: 4}}>
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-movie-id={actor.id.toString()}
                    onClick={actorSaveHandler}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    data-movie-id={actor.id.toString()}
                    onClick={actorDiscardHandler}
                >
                    Discard
                </button>
                </div>
            </div>
        </>
    );
};

export default ActorEdit;