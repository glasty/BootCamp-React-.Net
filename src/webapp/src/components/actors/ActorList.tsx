import React, { useState } from "react";
import IActor from "../../model/IActor";
import ActorContainer from "./ActorContainer";
import IMovie from "../../model/IMovie";

interface IActorListProps {
    actors: IActor[];
    movies: IMovie[];
    
}

const ActorList: React.FC<IActorListProps> = ({ actors, movies }) => {
    return (
        <div className="container">
            <div className="row">
                {actors.map(a => (
                    <div key={a.id} className="col-12">
                        <ActorContainer actor={a} movies={movies}/>
                    </div>
                ))}
            </div>           
        </div>
    );
}

export default ActorList;