using B2B.Server.Data;
using B2B.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using BCrypt.Net;

namespace B2B.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users
                .FromSqlRaw("SELECT * FROM Users")
                .ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Users>> GetUserById(int id)
        {
            var user = await _context.Users
                .FromSqlRaw("SELECT * FROM Users WHERE Id = {0}", id)
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return user;
        }

        // POST: api/users
        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> CreateUser(Users user)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

            var result = await _context.Database.ExecuteSqlRawAsync(
                @"INSERT INTO Users 
                (Username, Firstname, Lastname, Email, Password, Country, Address, Address2, City, Phone, BusinessNo, BusinessName) 
                VALUES ({0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11})",
                user.Username, user.Firstname, user.Lastname, user.Email, hashedPassword,
                user.Country, user.Address, user.Address2, user.City, user.Phone,
                user.BusinessNo, user.BusinessName
            );

            return Ok(new { message = "User created with hashed password", rowsAffected = result });
        }

        // PUT: api/users/5
        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(int id, Users user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

            var result = await _context.Database.ExecuteSqlRawAsync(
                @"UPDATE Users SET 
                Username = {0}, Firstname = {1}, Lastname = {2}, Email = {3}, Password = {4}, 
                Country = {5}, Address = {6}, Address2 = {7}, City = {8}, Phone = {9}, 
                BusinessNo = {10}, BusinessName = {11} 
                WHERE Id = {12}",
                user.Username, user.Firstname, user.Lastname, user.Email, hashedPassword,
                user.Country, user.Address, user.Address2, user.City, user.Phone,
                user.BusinessNo, user.BusinessName, user.Id
            );

            if (result == 0)
                return NotFound();

            return Ok(new { message = "User updated with hashed password", rowsAffected = result });
        }

        // DELETE: api/users/5
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "DELETE FROM Users WHERE Id = {0}", id
            );

            if (result == 0)
                return NotFound();

            return Ok(new { message = "User deleted", rowsAffected = result });
        }

        // POST: api/users/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FromSqlRaw("SELECT * FROM Users WHERE Username = {0}", request.Username)
                .FirstOrDefaultAsync();

            if (user == null)
                return Unauthorized("Invalid username or password");

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            if (!isPasswordValid)
                return Unauthorized("Invalid username or password");

            return Ok(new { message = "Login successful", user.Id, user.Username });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
