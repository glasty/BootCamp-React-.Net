using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Data
{
    public class ActorRepository : IRepository<Actor>
    {
        private static readonly ICollection<Actor> actors;
        private static readonly MovieRepository movieList;

        static ActorRepository()
        {
            movieList = new MovieRepository();

            actors = new Collection<Actor>
            {
                new Actor
                {
                    Id = 1,
                    FirstName = "Harrison",
                    LastName = "Ford",
                    BirthDate = new DateTime(1942, 7, 13),
                    Photo = "https://m.media-amazon.com/images/M/MV5BMTY4Mjg0NjIxOV5BMl5BanBnXkFtZTcwMTM2NTI3MQ@@._V1_.jpg",
                    Movie = new Collection<Movie> { movieList.GetByName("Indiana Jones and the Last Crusade"), movieList.GetByName("Star Wars IV: A New Hope") }
                },
                new Actor
                {
                    Id = 2,
                    FirstName = "Mark",
                    LastName = "Hamill",
                    BirthDate = new DateTime(1951, 9, 25),
                    Photo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mark_Hamill_by_Gage_Skidmore_2.jpg/800px-Mark_Hamill_by_Gage_Skidmore_2.jpg",
                    Movie = new Collection<Movie> { movieList.GetByName("Star Wars IV: A New Hope") }
                },
                new Actor
                {
                    Id = 3,
                    FirstName = "Ian",
                    LastName = "McKellen",
                    BirthDate = new DateTime(1939, 5, 25),
                    Photo = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ian_McKellen.jpg",
                    Movie = new Collection<Movie> { movieList.GetByName("Lord of the Rings: The Return of the King") } 
                },
                new Actor
                {
                    Id = 4, 
                    FirstName = "Vigo",
                    LastName = "Mortensen",
                    BirthDate = new DateTime(1958, 10, 20),
                    Photo = "https://upload.wikimedia.org/wikipedia/commons/f/fe/Viggo_Mortensen_Cannes_2016.jpg",
                    Movie = new Collection<Movie> { movieList.GetByName("Lord of the Rings: The Return of the King") }
                },
                new Actor
                {
                    Id = 5, 
                    FirstName = "Keanu",
                    LastName = "Reeves",
                    BirthDate = new DateTime(1964, 9, 2),
                    Photo = "https://upload.wikimedia.org/wikipedia/commons/6/65/KeanuReevesLakehouse.jpg",
                    Movie = new Collection<Movie> { movieList.GetByName("Matrix") }
                },
                new Actor
                {
                    Id = 6,
                    FirstName = "Matt",
                    LastName = "Damon",
                    BirthDate = new DateTime(1970, 10, 8),
                    Photo = "https://upload.wikimedia.org/wikipedia/commons/8/83/Matt_Damon_TIFF_2015.jpg",
                    Movie = new Collection<Movie> { movieList.GetByName("Interstellar") }
                }
            };
        }

        public void Delete(int entityId)
        {
            var actor = actors.FirstOrDefault(a => a.Id == entityId);
            if (actor != null)
            {
                actors.Remove(actor);
            }
        }

        public Actor Get(int id)
        {
            return actors.FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<Actor> GetAll()
        {
            return actors;
        }

        public Actor Save(Actor entity)
        {
            if (entity.Id > 0)
            {
                var found = actors.FirstOrDefault(a => a.Id == entity.Id);
                if (found == null)
                {
                    throw new Exception($"Actor with ID {entity.Id} not found");
                }

                found.FirstName = entity.FirstName;
                found.MiddleName = entity.MiddleName;
                found.LastName = entity.LastName;
                found.Photo = entity.Photo;
                found.Movie = entity.Movie;
                found.BirthDate = entity.BirthDate;

                return found;
            }
            else
            {
                entity.Id = actors.Max(m => m.Id) + 1;
                actors.Add(entity);
            }

            return entity;
        }
    }
    
}
