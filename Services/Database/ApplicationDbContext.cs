using Microsoft.EntityFrameworkCore;
using Skeleton.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<EnderecoUsuario> EnderecosUsuarios { get; set; }
}
