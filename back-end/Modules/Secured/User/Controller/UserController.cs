namespace Skeleton.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Skeleton.Interfaces;
using Skeleton.DTOs;
using Skeleton.Utils.Models;


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    // GET: api/user?pageNumber=1&pageSize=10
    [HttpGet]
    public async Task<ActionResult<PagedResult<User>>> GetUsers([FromQuery] PaginationParams paginationParams)
    {
        var pagedUsers = await _userService.GetAllUsersAsync(paginationParams);
        return Ok(pagedUsers);
    }

    // GET: api/users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null)
            return NotFound();

        return Ok(user);
    }

    // GET: api/users/email/test@example.com
    [HttpGet("email/{email}")]
    public async Task<ActionResult<User>> GetUserByEmail(string email)
    {
        var user = await _userService.GetUserByEmailAsync(email);

        if (user == null)
            return NotFound();

        return Ok(user);
    }

    // GET: api/users/username/johndoe
    [HttpGet("username/{username}")]
    public async Task<ActionResult<User>> GetUserByUsername(string username)
    {
        var user = await _userService.GetUserByUsernameAsync(username);

        if (user == null)
            return NotFound();

        return Ok(user);
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        var createdUser = await _userService.CreateUserAsync(user);
        return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
    }

    // PUT: api/users/5
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UpdateUserDto user)
    {
        var updatedUser = await _userService.UpdateUserAsync(id, user);

        if (updatedUser == null)
            return NotFound();

        return NoContent();
    }

    // PATCH: api/user/{id}/toggle-active
    [HttpPatch("{id}/toggle-active")]
    public async Task<IActionResult> ToggleUserActiveStatus(int id)
    {
        var user = await _userService.ToggleUserActiveStatusAsync(id);

        if (user == null)
            return NotFound();

        return Ok(new {
            id = user.Id,
            username = user.Username,
            isActive = user.IsActive,
            message = user.IsActive ? "User activated" : "User deactivated"
        });
    }

    // DELETE: api/users/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var result = await _userService.DeleteUserAsync(id);

        if (!result)
            return NotFound();

        return NoContent();
    }
}
