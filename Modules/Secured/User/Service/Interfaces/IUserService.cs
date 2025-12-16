namespace Skeleton.Interfaces;

using Skeleton.DTOs;
using Skeleton.Models;
using Skeleton.Utils.Models;

public interface IUserService
{
    Task<PagedResult<User>> GetAllUsersAsync(PaginationParams paginationParams);
    Task<User?> GetUserByIdAsync(int id);
    Task<User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserByUsernameAsync(string username);
    Task<User> CreateUserAsync(User user);
    Task<User?> UpdateUserAsync(int id, UpdateUserDto user);
    Task<User?> ToggleUserActiveStatusAsync(int id);
    Task<bool> DeleteUserAsync(int id);
    Task<bool> UserExistsAsync(int id);
}
