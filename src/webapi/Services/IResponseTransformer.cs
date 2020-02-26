using Microsoft.AspNetCore.Mvc;

namespace Bootcamp.WebAPI
{
    public interface IResponseTransformer
    {
        IActionResult Transform(OkObjectResult result);
    }
}
