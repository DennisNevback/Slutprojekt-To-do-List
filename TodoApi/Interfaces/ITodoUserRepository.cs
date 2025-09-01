using TodoApi.Models;
using TodoApi.Dtos.Todo;
namespace TodoApi.Interfaces
{
  public interface ITodoUserRepository
  {
    Task<List<Todo>> GetAllAsyncUser(string userId);
    Task<Todo?> GetByIdUserAsync(int id, string userId);
    Task<Todo> CreateTodoUserAsync(Todo todoModel);
    Task<Todo?> UpdateTodoUserAsync(int id, UpdateTodoUserDto todoDto, string userId);
    Task<Todo?> DeleteTodoUserAsync(int id, string userID);
  }
}