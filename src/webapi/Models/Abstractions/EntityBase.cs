namespace Bootcamp.WebAPI.Models
{
    public abstract class EntityBase : IEntity<int>
    {
        public int Id { get; set; }
    }
}
