import React, {useState} from "react";
import IActor from "../../model/IActor";
import IMovie from "../../model/IMovie";
import ActorEdit from "./ActorEdit";
import ActorDisplay from "./ActorDisplay";
import ActorNew from "./ActorNew";

interface IActorContainerProps {
    actor: IActor;
    movies: IMovie[];
}

const ActorContainer: React.FC<IActorContainerProps> = ({ actor, movies }) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const saveActorHandler = (actor: IActor) => {
        setEditMode(false);
    }

    const editActorHandler = (actor: IActor) => {
        setEditMode(true);
    }

    const discardActorHandler = (actor: IActor) => {

    }

    const removeActorHandler = (actor: IActor) => {

    }
    
    return (
        <div className={`card`}>
            {actor.id > 0 ? 
                (editMode ? 
                    <ActorEdit actor={actor} movies={movies} onActorDiscard={discardActorHandler} onActorSave={saveActorHandler}/> :
                    <ActorDisplay actor={actor} onActorEdit={editActorHandler}/>) : 
                <ActorNew/>}
        </div>
    );
}

export default ActorContainer;