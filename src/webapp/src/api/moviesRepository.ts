import IMovie from "../model/IMovie";
import Axios from "axios";
import { API_URL_M } from "./constants";

class MovieRepository {
  getAll = async (): Promise<IMovie[]> => {
    const { data } = await Axios.get<IMovie[]>(API_URL_M);

    console.log(`[MovieRepository.getAll]: Retrieved data`, data);

    return data;
  };

  save = async (movie: IMovie): Promise<IMovie> => {
    const response = await Axios.post<IMovie>(API_URL_M, movie);

    console.log(`[MovieRepository.save]: Retrieved response`, response);

    return response.data;
  };
}

export default MovieRepository;
