using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Data
{
    public class GenreRepository : IRepository<Genre>
    {

        private static readonly ICollection<Genre> genres;

        static GenreRepository()
        {

            genres = new Collection<Genre>
            {
                new Genre
                {
                    Id = 1,
                    Name = "Fantasy"
                },
                new Genre
                {
                    Id = 2,
                    Name = "Action"
                },
                new Genre
                { 
                    Id = 3,
                    Name = "Adventure" 
                },
                new Genre 
                { 
                    Id = 4, 
                    Name = "Sci-fi" 
                },
                new Genre 
                { 
                    Id = 5, 
                    Name = "Drama" 
                }
            };
        }
        public void Delete(int entityId)
        {
            var genre = genres.FirstOrDefault(g => g.Id == entityId);
            if (genre != null)
            {
                genres.Remove(genre);
            }
        }

        public Genre Get(int id)
        {
            return genres.FirstOrDefault(g => g.Id == id);
        }

        public Genre GetByName(string name)
        {
            return genres.FirstOrDefault(g => g.Name == name);
        }

        public IEnumerable<Genre> GetAll()
        {
            return genres;
        }

        public Genre Save(Genre entity)
        {
            if (entity.Id > 0)
            {
                var found = genres.FirstOrDefault(g => g.Id == entity.Id);
                if (found == null)
                {
                    throw new Exception($"Genre with ID {entity.Id} not found");
                }

                found.Name = entity.Name;

                return found;
            }
            else
            {
                entity.Id = genres.Max(g => g.Id) + 1;
                genres.Add(entity);
            }

            return entity;
        }
    }
}
