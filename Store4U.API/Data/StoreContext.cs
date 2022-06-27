using Microsoft.EntityFrameworkCore;
using Store4U.API.Entities;

namespace Store4U.API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}