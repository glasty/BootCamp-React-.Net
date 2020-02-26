#region Using directives

using Bootcamp.WebAPI.Data;
using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

#endregion

namespace Bootcamp.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IResponseTransformer, NoResponseTransformer>();
            services.AddTransient<IRepository<Movie>, MovieRepository>();
            services.AddTransient<IRepository<Genre>, GenreRepository>();

            services.AddHttpContextAccessor();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHttpContextAccessor accessor)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            //app.Use(async (ctx, next) =>
            //{
            //    if (ctx.Request.Path.Value.EndsWith("index.html"))
            //    {
            //        await ctx.Response.WriteAsync("Ja mam prednost");
            //    }
            //    else
            //    {
            //        await next();
            //    }
            //});

            //app.UseHttpsRedirection();

            app.UseCors(
                options =>
                {
                    options.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });

            app.UseRouting();

            //app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}