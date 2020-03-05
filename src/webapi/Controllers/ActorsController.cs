using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Bootcamp.WebAPI.Controllers
{
    [Route("api/actors")]
    [ApiController]
    public class ActorsController : Controller
    {
        private readonly ILogger<ActorsController> log;
        private readonly IResponseTransformer transformer;
        private readonly IRepository<Actor> repo;

        public ActorsController(ILogger<ActorsController> log, IResponseTransformer transformer, IRepository<Actor> repo)
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
        public IActionResult Post(Actor actor)
        {
            return Ok(this.repo.Save(actor));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            this.repo.Delete(id);

            return Ok();
        }
    }
}