using TodoApi.Models;
using TodoApi.Dtos.Todo;

namespace TodoApi.Interfaces
{
  public interface ITokenService
  {
    Task<string> CreateTokenAsync(AppUser user);
  }
}