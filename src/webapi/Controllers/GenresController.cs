using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bootcamp.WebAPI.Data;
using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Bootcamp.WebAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : Controller
    {

        private readonly ILogger<MoviesController> log;
        private readonly IResponseTransformer transformer;
        private readonly IRepository<Genre> repo;

        public GenresController(ILogger<MoviesController> log, IResponseTransformer transformer, IRepository<Genre> repo)
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
        public IActionResult Post(Genre genre)
        {
            return Ok(this.repo.Save(genre));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            this.repo.Delete(id);

            return Ok();
        }
    }
}