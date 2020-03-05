import React, { useEffect } from "react";
import IActor from "../../model/IActor";
import styles from "./ActorDisplay.module.scss";

interface IActorDisplayProps { 
    actor: IActor;
}

const ActorDisplay: React.FC<IActorDisplayProps> = ({ actor }) => {
    useEffect(() => {
        console.log("Actor: ", actor.birthDate);
    });

    
    return (
        <>
            <div className="card-header">{actor.firstName} {actor.middleName} {actor.lastName}</div>
            <div className="card-body" style={{ padding: "15px" }}>
                <div className={`${styles.movieDetails} row`}>
                <div className="col-3" style={{ paddingRight: "7px" }}>
                    <img src={actor.photo} className={styles.movieThumbnail} alt={actor.firstName} />
                </div>
                <div className="col-9" style={{ paddingLeft: "7px" }}>
                    <table className={`${styles.movieGenres} table table-sm`}>
                    <tbody>
                        <tr>
                        <th>Birth year:</th>
                        <td>{actor.birthDate}</td>
                        </tr>
                        <tr>
                        <th>Movies:</th>
                        <td>
                            <ul>
                            {actor.movie.map(m => (
                                <li key={m.id}>{m.title}</li>
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
                    data-movie-id={actor.id.toString()}
                    onClick={() => {}}
                >
                    Edit
                </button>
                </div>
            </div>
        </>
    );
} 

export default ActorDisplay;