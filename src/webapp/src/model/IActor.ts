import IMovie from "./IMovie";

/*
 * Interface for Actor objects that are retrieved from WebAPI.
 */
export default interface IActor {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: string;
    photo: string;
    movie: IMovie[];
  }