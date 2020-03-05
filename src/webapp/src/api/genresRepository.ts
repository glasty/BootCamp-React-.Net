import IGenre from "../model/IGenre";
import Axios, { AxiosResponse } from "axios";
import { API_URL_G } from "./constants";

class GenreRepository {
    getAll = async (): Promise<IGenre[]> => {
        const { data } = await Axios.get<IGenre[]>(API_URL_G);
    
        console.log(`[MovieRepository.getAll]: Retrieved data`, data);
    
        return data;
      };

    save = async (genre: IGenre): Promise<IGenre> => {
      const response = await Axios.post<IGenre>(API_URL_G, genre);

      console.log(`[GenreRepository.save]: Retrieved response`, response);

      return response.data;
      };

    delete = async (genre: IGenre): Promise<AxiosResponse> => {
      const response = await Axios.delete<IGenre>(API_URL_G + "/" + genre.id);

      console.log(`[GenreRepository.delete]: Retrieved response`, response);

      return response;
    }
}

export default GenreRepository;