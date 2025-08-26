using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using Microsoft.EntityFrameworkCore;
using TodoApi.Dtos.Todo;
using TodoApi.Mappers;
using TodoApi.Interfaces;

namespace TodoApi.Controllers
{
  [Route("api/todo")]
  [ApiController]
  public class TodoController : ControllerBase
  {
    private readonly ApplicationDBContext _context;
    private readonly ITodoRepository _todoRepo;
    public TodoController(ApplicationDBContext context, ITodoRepository todoRepo)
    {
      _todoRepo = todoRepo;
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var todos = await _todoRepo.GetAllAsync();

      return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var todo = await _todoRepo.GetByIdAsync(id);

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
      await _todoRepo.CreateAsync(todoModel);

      return CreatedAtAction(
          nameof(GetById),
          new { id = todoModel.id },
          todoModel
      );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTodoDto updateTodo)
    {
      var todo = await _todoRepo.UpdateAsync(id, updateTodo);
      if (todo == null)
      {
        return NotFound();
      }

      return Ok(updateTodo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var todo = await _todoRepo.DeleteAsync(id);

      if (todo == null)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}