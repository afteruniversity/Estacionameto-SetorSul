namespace Skeleton.Services;

using Microsoft.EntityFrameworkCore;
using Skeleton.Models;
using Skeleton.Interfaces;

public class EnderecoUsuarioService : IEnderecoUsuarioService
{
    private readonly ApplicationDbContext _context;

    public EnderecoUsuarioService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EnderecoUsuario>> GetAllEnderecosByUserIdAsync(int userId)
    {
        return await _context.EnderecosUsuarios
            .Where(e => e.UserId == userId)
            .OrderBy(e => e.Id)
            .ToListAsync();
    }

    public async Task<EnderecoUsuario?> GetEnderecoByIdAsync(int id)
    {
        return await _context.EnderecosUsuarios
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<EnderecoUsuario> CreateEnderecoAsync(EnderecoUsuario endereco)
    {
        endereco.CreatedAt = DateTime.UtcNow;
        endereco.UpdatedAt = DateTime.UtcNow;

        _context.EnderecosUsuarios.Add(endereco);
        await _context.SaveChangesAsync();

        return endereco;
    }

    public async Task<EnderecoUsuario?> UpdateEnderecoAsync(int id, EnderecoUsuario endereco)
    {
        var existingEndereco = await _context.EnderecosUsuarios.FindAsync(id);

        if (existingEndereco == null)
            return null;

        existingEndereco.Logradouro = endereco.Logradouro;
        existingEndereco.Numero = endereco.Numero;
        existingEndereco.Cep = endereco.Cep;
        existingEndereco.Complemento = endereco.Complemento;
        existingEndereco.Bairro = endereco.Bairro;
        existingEndereco.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return existingEndereco;
    }

    public async Task<bool> DeleteEnderecoAsync(int id)
    {
        var endereco = await _context.EnderecosUsuarios.FindAsync(id);

        if (endereco == null)
            return false;

        _context.EnderecosUsuarios.Remove(endereco);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> EnderecoExistsAsync(int id)
    {
        return await _context.EnderecosUsuarios.AnyAsync(e => e.Id == id);
    }

    public async Task<bool> UserOwnsEnderecoAsync(int userId, int enderecoId)
    {
        return await _context.EnderecosUsuarios
            .AnyAsync(e => e.Id == enderecoId && e.UserId == userId);
    }
}
