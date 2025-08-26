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
    public IActionResult GetAll()
    {
      var todos = _context.Todos.ToList();

      return Ok(todos);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
      var todo = _context.Todos.FirstOrDefault(t => t.id == id);

      if (todo == null)
      {
        return NotFound();
      }

      return Ok(todo);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateTodoDto todoDto)
    {
      var todoModel = todoDto.ToCreateTodoDto();
      _context.Todos.Add(todoModel);
      _context.SaveChanges();

      return CreatedAtAction(
          nameof(GetById),
          new { id = todoModel.id },
          todoModel
      );
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromRoute] int id, [FromBody] UpdateTodoDto updateTodo)
    {
      //Find the correct row
      var todo = _context.Todos.FirstOrDefault(t => t.id == id);
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

      _context.SaveChanges();

      return Ok(updateTodo);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete([FromRoute] int id)
    {
      var todo = _context.Todos.FirstOrDefault(t => t.id == id);
      if (todo == null)
      {
        return NotFound();
      }
      _context.Todos.Remove(todo);
      _context.SaveChanges();

      return NoContent();
    }
  }
}