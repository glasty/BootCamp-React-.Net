#region Using directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;

#endregion

namespace Bootcamp.WebAPI.Data
{
    public class MovieRepository : IRepository<Movie>
    {
        /// <summary>
        /// In-memory storage for movies.
        /// Not ready for production use!
        /// </summary>
        private static readonly ICollection<Movie> movies;
        private static readonly GenreRepository genreList;

        static MovieRepository()
        {

            genreList = new GenreRepository();
            
            movies = new Collection<Movie>
            {
                new Movie
                {
                    Id = 1,
                    Title = "Indiana Jones and the Last Crusade",
                    Year = 1989,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,678,1000_AL_.jpg",
                    Genres = new List<Genre> { genreList.GetByName("Action"), genreList.GetByName("Adventure") }

                },
                new Movie
                {
                    Id = 2,
                    Title = "Star Wars IV: A New Hope",
                    Year = 1977,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BMDM1NmMxMzItYWUzMC00Yzc2LTk4MzctOTdkNDVhODY2N2MxXkEyXkFqcGdeQXVyNDQ0Mjg4NTY@._V1_SY1000_CR0,0,707,1000_AL_.jpg",
                    Genres = new List<Genre> { genreList.GetByName("Action"), genreList.GetByName("Adventure"), genreList.GetByName("Sci-fi") }
                },
                new Movie
                {
                    Id = 3,
                    Title = "Lord of the Rings: The Return of the King",
                    Year = 2003,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
                    Genres = new List<Genre> { genreList.GetByName("Adventure"), genreList.GetByName("Fantasy") }
                },
                new Movie
                {
                    Id = 4,
                    Title = "Interstellar",
                    Year = 2014,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg",
                    Genres = new List<Genre> { genreList.GetByName("Sci-fi"), genreList.GetByName("Adventure"), genreList.GetByName("Drama") }
                },
                new Movie
                {
                    Id = 5,
                    Title = "Avatar",
                    Year = 2013,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_.jpg",
                    Genres = new List<Genre> { genreList.GetByName("Action"), genreList.GetByName("Adventure"), genreList.GetByName("Fantasy") }
                },
                new Movie
                {
                    Id = 6,
                    Title = "Matrix",
                    Year = 1999,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg",
                    Genres = new List<Genre> { genreList.GetByName("Action"), genreList.GetByName("Sci-fi") }
                },
                new Movie
                {
                    Id = 7,
                    Title = "Godfather",
                    Year = 1972,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg",
                    Genres = new List<Genre> { genreList.GetByName("Drama") }
                }

            };
        }

        public IEnumerable<Movie> GetAll()
        {
            return movies;
        }

        public Movie Get(int id)
        {
            return movies.FirstOrDefault(m => m.Id == id);
        }

        public Movie Save(Movie entity)
        {
            if (entity.Id > 0)
            {
                var found = movies.FirstOrDefault(m => m.Id == entity.Id);
                if (found == null)
                {
                    throw new Exception($"Movie with ID {entity.Id} not found");
                }

                found.Year = entity.Year;
                found.Title = entity.Title;
                found.Genres = entity.Genres;

                return found;
            }
            else
            {
                entity.Id = movies.Max(m => m.Id) + 1;
                movies.Add(entity);
            }

            return entity;
        }

        public void Delete(int entityId)
        {
            var movie = movies.FirstOrDefault(m => m.Id == entityId);
            if (movie != null)
            {
                movies.Remove(movie);
            }
        }
    }
}