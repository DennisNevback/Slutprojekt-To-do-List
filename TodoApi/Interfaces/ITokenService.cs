using TodoApi.Models;
using TodoApi.Dtos.Todo;
namespace TodoApi.Interfaces
{
  public interface ITokenService
  {
    string CreateToken(AppUser user);
  }
}