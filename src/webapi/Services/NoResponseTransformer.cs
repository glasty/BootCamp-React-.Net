using Microsoft.AspNetCore.Mvc;

namespace Bootcamp.WebAPI
{
    public class NoResponseTransformer : IResponseTransformer
    {
        public IActionResult Transform(OkObjectResult result)
        {
            return result;
        }
    }
}
