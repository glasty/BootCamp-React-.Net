import IGenre from "./IGenre";

/*
 * Interface for Movie objects that are retrieved from WebAPI.
 */
export default interface IMovie {
  id: number;

  title: string;

  year: number;

  thumbnailUrl: string;

  genres: IGenre[];
}
