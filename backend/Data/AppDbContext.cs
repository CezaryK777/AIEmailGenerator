using AIEmailGeneratorBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AIEmailGeneratorBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<EmailHistory> EmailHistories { get; set; }
    }
}
