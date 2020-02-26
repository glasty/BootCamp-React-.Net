using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Models
{
    public class Movie : EntityBase
    {
        public string Title { get; set; }

        public string ThumbnailUrl { get; set; }

        public int? Year { get; set; }

        public ICollection<Genre> Genres { get; set; } = new Collection<Genre>();

        public ICollection<Actor> Actors { get; set; } = new Collection<Actor>();
    }
}
