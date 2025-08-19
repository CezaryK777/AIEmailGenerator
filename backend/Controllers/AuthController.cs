using AIEmailGeneratorBackend.Data;
using AIEmailGeneratorBackend.Models;
using AIEmailGeneratorBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AuthRequest authRequest)
    {
        if (_context.Users.Any(u => u.Username == authRequest.Username))
            return BadRequest("User already exists!");

        var user = new User
        {
            Username = authRequest.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(authRequest.Password),
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Registered");
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login(
        [FromBody] AuthRequest authRequest,
        [FromServices] JwtService jwtService
    )
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == authRequest.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(authRequest.Password, user.PasswordHash))
            return Unauthorized("Wrong Credentials");

        var token = jwtService.GenerateToken(user.Username, user.Id);

        return Ok(
            new
            {
                message = "Login successful",
                token,
                user = new { user.Id, user.Username },
            }
        );
    }
}
