using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Bootcamp.WebAPI.Models
{
    public class Actor : EntityBase
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }

        public ICollection<Movie> Movie { get; set; } = new Collection<Movie>();
    }
}
