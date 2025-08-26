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
          nameof(GetById),          // Action som kan hämta objektet
          new { id = todoModel.id },// route values
          todoModel                 // objektet i responsen
      );
    }
  }
}