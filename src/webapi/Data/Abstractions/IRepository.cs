using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Data.Abstractions
{
    public interface IRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();

        TEntity Get(int id);

        TEntity Save(TEntity entity);

        void Delete(int entityId);
    }
}
