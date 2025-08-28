using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TodoApi.Data
{
  public class ApplicationDBContext : IdentityDbContext<AppUser>
  {
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
    : base(options)
    {

    }

    public DbSet<Todo> Todos { get; set; }
  }
}