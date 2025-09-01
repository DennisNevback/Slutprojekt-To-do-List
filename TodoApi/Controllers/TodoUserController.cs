using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using Microsoft.EntityFrameworkCore;
using TodoApi.Dtos.Todo;
using TodoApi.Dtos.TodoUser;
using TodoApi.Mappers;
using TodoApi.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace TodoApi.Controllers
{
  [Route("api/todo/")]
  [ApiController]
  public class TodoUserController : ControllerBase
  {
    private readonly ApplicationDBContext _context;
    private readonly ITodoUserRepository _todoUserRepo;
    public TodoUserController(ApplicationDBContext context, ITodoUserRepository todoUserRepo)
    {
      _todoUserRepo = todoUserRepo;
      _context = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllUser()
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null)
      {
        return Unauthorized(new { message = "User ID could not be determined from the token." });
      }
      var todos = await _todoUserRepo.GetAllAsyncUser(userId);

      return Ok(todos);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetByIdUser([FromRoute] int id)
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null)
      {
        return Unauthorized(new { message = "User ID could not be determined from the token." });
      }

      var todo = await _todoUserRepo.GetByIdUserAsync(id, userId);

      if (todo == null)
      {
        return NotFound();
      }

      return Ok(todo);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateTodoUser([FromBody] CreateTodoUserDto todoDto)
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null)
      {
        return Unauthorized(new { message = "User ID could not be determined from the token." });
      }

      var todoModel = todoDto.ToCreateTodoUserDto(userId);

      await _todoUserRepo.CreateTodoUserAsync(todoModel);

      return CreatedAtAction(
          nameof(GetByIdUser),
          new { id = todoModel.id },
          todoModel
      );
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateTodoUser([FromRoute] int id, [FromBody] UpdateTodoUserDto updateTodo)
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null)
      {
        return Unauthorized(new { message = "User ID could not be determined from the token." });
      }

      var todo = await _todoUserRepo.UpdateTodoUserAsync(id, updateTodo, userId);
      if (todo == null)
      {
        return NotFound();
      }

      return Ok(updateTodo);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteTodoUser([FromRoute] int id)
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null)
      {
        return Unauthorized(new { message = "User ID could not be determined from the token." });
      }

      var todo = await _todoUserRepo.DeleteTodoUserAsync(id, userId);

      if (todo == null)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}