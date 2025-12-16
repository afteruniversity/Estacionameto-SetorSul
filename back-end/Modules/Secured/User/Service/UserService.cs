namespace Skeleton.Services;

using Microsoft.EntityFrameworkCore;
using Skeleton.DTOs;
using Skeleton.Models;
using Skeleton.Interfaces;
using Skeleton.Utils.Models;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<User>> GetAllUsersAsync(PaginationParams paginationParams)
    {
        return await _context.Users
            .Include(u => u.Enderecos)
            .Where(u => u.IsActive)
            .OrderBy(u => u.Id)
            .ToPaginatedListAsync(paginationParams);
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _context.Users
            .Include(u => u.Enderecos)
            .FirstOrDefaultAsync(u => u.Id == id && u.IsActive);
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _context.Users
            .Include(u => u.Enderecos)
            .FirstOrDefaultAsync(u => u.Email == email && u.IsActive);
    }

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
        return await _context.Users
            .Include(u => u.Enderecos)
            .FirstOrDefaultAsync(u => u.Username == username && u.IsActive);
    }

    public async Task<User> CreateUserAsync(User user)
    {
        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<User?> UpdateUserAsync(int id, UpdateUserDto user)
    {
        var existingUser = await _context.Users.FindAsync(id);

        if (existingUser == null || !existingUser.IsActive)
            return null;

        existingUser.Username = user.Username;
        existingUser.Email = user.Email;
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return existingUser;
    }

    public async Task<User?> ToggleUserActiveStatusAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return null;

        user.IsActive = !user.IsActive;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return false;

        user.IsActive = false;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UserExistsAsync(int id)
    {
        return await _context.Users.AnyAsync(u => u.Id == id && u.IsActive);
    }
}
