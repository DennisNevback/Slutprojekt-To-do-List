using TodoApi.Interfaces;
using TodoApi.Models;
using TodoApi.Data;
using TodoApi.Dtos.Todo;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Repository
{
  public class TodoRepository : ITodoRepository
  {
    private readonly ApplicationDBContext _context;
    public TodoRepository(ApplicationDBContext context)
    {
      _context = context;
    }
    public async Task<List<Todo>> GetAllAsync()
    {
      return await _context.Todos.ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(int id)
    {
      return await _context.Todos.FirstOrDefaultAsync(t => t.id == id);
    }

    public async Task<Todo> CreateAsync(Todo todoModel)
    {
      await _context.Todos.AddAsync(todoModel);
      await _context.SaveChangesAsync();
      return todoModel;
    }
    public async Task<Todo?> UpdateAsync(int id, UpdateTodoDto todoDto)
    {
      var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id);
      if (todo == null)
      {
        return null;
      }

      todo.user_id = todoDto.user_id;
      todo.title = todoDto.title;
      todo.description = todoDto.description;
      todo.due_date = todoDto.due_date;
      todo.priority = todoDto.priority;
      todo.status = todoDto.status;
      todo.created_at = todoDto.created_at;

      await _context.SaveChangesAsync();

      return todo;

    }
    public async Task<Todo?> DeleteAsync(int id)
    {
      var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id);
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