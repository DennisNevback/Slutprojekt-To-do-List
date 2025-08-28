using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace TodoApi.Data
{
  public class ApplicationDBContext : IdentityDbContext<AppUser>
  {
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
    : base(options)
    {

    }

    public DbSet<Todo> Todos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      List<IdentityRole> roles = new List<IdentityRole>
      {
        new IdentityRole{
          Name = "Admin",
          NormalizedName = "ADMIN"
        },
        new IdentityRole{
          Name = "user",
          NormalizedName = "User"
        }
      };
      builder.Entity<IdentityRole>().HasData(roles);
    }
  }
}