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
    
    return (
        <div className={`card`}>
            {actor.id > 0 ? 
                (editMode ? 
                    <ActorEdit/> :
                    <ActorDisplay actor={actor}/>) : 
                <ActorNew/>}
        </div>
    );
}

export default ActorContainer;