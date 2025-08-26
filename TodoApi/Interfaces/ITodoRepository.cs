using TodoApi.Models;
using TodoApi.Dtos.Todo;
namespace TodoApi.Interfaces
{
  public interface ITodoRepository
  {
    Task<List<Todo>> GetAllAsync();
    Task<Todo?> GetByIdAsync(int id);
    Task<Todo> CreateAsync(Todo todoModel);
    Task<Todo?> UpdateAsync(int id, UpdateTodoDto todoDto);
    Task<Todo?> DeleteAsync(int id);
  }
}