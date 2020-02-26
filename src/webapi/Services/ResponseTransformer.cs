using System;
using Microsoft.AspNetCore.Mvc;

namespace Bootcamp.WebAPI
{
    public class ResponseTransformer : IResponseTransformer
    {
        public IActionResult Transform(OkObjectResult result)
        {
            return new OkObjectResult(new { envelope = result.Value });
        }
    }
}
