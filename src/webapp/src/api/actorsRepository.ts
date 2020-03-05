import Axios from "axios";
import IActor from "../model/IActor";
import { API_URL_A } from "./constants";

class ActorRepository {
    getAll = async (): Promise<IActor[]> => {
        const { data } = await Axios.get<IActor[]>(API_URL_A);
    
        console.log(`[MovieRepository.getAll]: Retrieved data`, data);
    
        return data;
    };

    save = async (genre: IActor): Promise<IActor> => {
      const response = await Axios.post<IActor>(API_URL_A, genre);

      console.log(`[GenreRepository.save]: Retrieved response`, response);

      return response.data;
    };
}

export default ActorRepository;