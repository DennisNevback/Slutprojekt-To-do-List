using TodoApi.Interfaces;
using TodoApi.Models;
using Microsoft.IdentityModel.Tokens;      // SymmetricSecurityKey, SigningCredentials, SecurityTokenDescriptor, SecurityAlgorithms
using System.Text;                         // Encoding.UTF8
using Microsoft.Extensions.Configuration;  // IConfiguration
using System.Security.Claims;              // Claim, ClaimsIdentity
using System.IdentityModel.Tokens.Jwt;

namespace TodoApi.Service
{
  public class TokenService : ITokenService
  {
    //Get your JWT settings from appsettings.json
    private readonly IConfiguration _config;
    private readonly SymmetricSecurityKey _key;
    public TokenService(IConfiguration config)
    {
      _config = config;
      _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
    }
    public string CreateToken(AppUser user)
    {
      var claims = new List<Claim>
      {
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
      };

      var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

      //settings for the token
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(7),
        SigningCredentials = creds,
        Issuer = _config["JWT:Issuer"],
        Audience = _config["JWT:Audience"]
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}