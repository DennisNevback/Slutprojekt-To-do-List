using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Data
{
  public class ApplicationDBContext : DbContext
  {
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
    : base(options)
    {

    }

    public DbSet<Todo> Todos { get; set; }
  }
}