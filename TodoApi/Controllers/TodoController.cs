using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using Microsoft.EntityFrameworkCore;
using TodoApi.Dtos.Todo;
using TodoApi.Mappers;

namespace TodoApi.Controllers
{
  [Route("api/todo")]
  [ApiController]
  public class TodoController : ControllerBase
  {
    private readonly ApplicationDBContext _context;
    public TodoController(ApplicationDBContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var todos = await _context.Todos.ToListAsync();

      return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id);

      if (todo == null)
      {
        return NotFound();
      }

      return Ok(todo);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTodoDto todoDto)
    {
      var todoModel = todoDto.ToCreateTodoDto();
      await _context.Todos.AddAsync(todoModel);
      await _context.SaveChangesAsync();

      return CreatedAtAction(
          nameof(GetById),
          new { id = todoModel.id },
          todoModel
      );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTodoDto updateTodo)
    {
      //Find the correct row
      var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id);
      if (todo == null)
      {
        return NotFound();
      }
      todo.user_id = updateTodo.user_id;
      todo.title = updateTodo.title;
      todo.description = updateTodo.description;
      todo.due_date = updateTodo.due_date;
      todo.priority = updateTodo.priority;
      todo.status = updateTodo.status;
      todo.created_at = updateTodo.created_at;

      await _context.SaveChangesAsync();

      return Ok(updateTodo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id);
      if (todo == null)
      {
        return NotFound();
      }
      _context.Todos.Remove(todo);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}