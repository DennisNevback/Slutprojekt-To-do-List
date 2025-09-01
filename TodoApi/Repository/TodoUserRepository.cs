using TodoApi.Interfaces;
using TodoApi.Models;
using TodoApi.Data;
using TodoApi.Dtos.Todo;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Repository
{
  public class TodoUserRepository : ITodoUserRepository
  {
    private readonly ApplicationDBContext _context;
    public TodoUserRepository(ApplicationDBContext context)
    {
      _context = context;
    }
    public async Task<List<Todo>> GetAllAsyncUser(string userId)
    {
      var todos = await _context.Todos
      .Where(t => t.user_id == userId)
      .ToListAsync();
      return todos;
    }

    public async Task<Todo?> GetByIdUserAsync(int id, string userId)
    {
      return await _context.Todos.FirstOrDefaultAsync(t => t.id == id && t.user_id == userId);
    }

    public async Task<Todo> CreateTodoUserAsync(Todo todoModel)
    {
      await _context.Todos.AddAsync(todoModel);
      await _context.SaveChangesAsync();
      return todoModel;
    }
    public async Task<Todo?> UpdateTodoUserAsync(int id, UpdateTodoUserDto todoDto, string userId)
    {
      var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id && t.user_id == userId);
      if (todo == null)
      {
        return null;
      }

      todo.title = todoDto.title;
      todo.description = todoDto.description;
      todo.due_date = todoDto.due_date;
      todo.priority = todoDto.priority;
      todo.status = todoDto.status;
      todo.created_at = todoDto.created_at;

      await _context.SaveChangesAsync();

      return todo;

    }
    public async Task<Todo?> DeleteTodoUserAsync(int id, string userId)
    {
      var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id && t.user_id == userId);
      if (todo == null)
      {
        return null;
      }
      _context.Remove(todo);
      await _context.SaveChangesAsync();

      return todo;
    }
  }
}