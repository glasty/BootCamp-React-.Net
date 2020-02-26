using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : Controller
    {
        private readonly ILogger<MoviesController> log;
        private readonly IResponseTransformer transformer;
        private readonly IRepository<Movie> repo;

        public MoviesController(ILogger<MoviesController> log, IResponseTransformer transformer, IRepository<Movie> repo)
        {
            this.log = log;
            this.transformer = transformer;
            this.repo = repo;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            return Ok(this.repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(this.repo.Get(id));
        }

        [HttpPost("")]
        public IActionResult Post(Movie movie)
        {
            return Ok(this.repo.Save(movie));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            this.repo.Delete(id);

            return Ok();
        }
    }
}
