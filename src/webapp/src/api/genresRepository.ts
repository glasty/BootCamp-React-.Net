import IGenre from "../model/IGenre";
import Axios from "axios";
import { API_URL_G } from "./constants";

class GenreRepository {
    getAll = async (): Promise<IGenre[]> => {
        const { data } = await Axios.get<IGenre[]>(API_URL_G);
    
        console.log(`[MovieRepository.getAll]: Retrieved data`, data);
    
        return data;
      };
}

export default GenreRepository;