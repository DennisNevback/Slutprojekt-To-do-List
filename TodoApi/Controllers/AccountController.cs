using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.Dtos.Account;
using TodoApi.Mappers;
using TodoApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;


namespace TodoApi.Controllers
{
  [Route("api/account")]
  [ApiController]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
    {
      _userManager = userManager;
      _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
      try
      {
        if (!ModelState.IsValid)
        {
          return BadRequest(ModelState);
        }

        var AppUser = new AppUser
        {
          UserName = registerDto.UserName,
          Email = registerDto.Email
        };

        var createdUser = await _userManager.CreateAsync(AppUser, registerDto.Password);

        if (createdUser.Succeeded)
        {
          var roleResult = await _userManager.AddToRoleAsync(AppUser, "User");
          if (roleResult.Succeeded)
          {
            return Ok(
              new NewUserDto
              {
                UserName = AppUser.UserName,
                Email = AppUser.Email,
                Token = _tokenService.CreateToken(AppUser)
              }
            );
          }
          else
          {
            return StatusCode(500, roleResult.Errors);
          }
        }
        else
        {
          return StatusCode(500, createdUser.Errors);
        }
      }
      catch (Exception e)
      {
        return StatusCode(500, new { error = e.Message });
      }
    }
  }
}