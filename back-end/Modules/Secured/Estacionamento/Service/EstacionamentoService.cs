namespace Skeleton.Services;

using Microsoft.EntityFrameworkCore;
using Skeleton.DTOs;
using Skeleton.Models;
using Skeleton.Interfaces;
using Skeleton.Utils.Models;

public class EstacionamentoService : IEstacionamentoService
{
    private readonly ApplicationDbContext _context;

    public EstacionamentoService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<Estacionamento>> GetAllEstacionamentosAsync(PaginationParams paginationParams)
    {
        return await _context.Estacionamentos
            .Where(e => e.IsActive)
            .OrderBy(e => e.Id)
            .ToPaginatedListAsync(paginationParams);
    }

    public async Task<Estacionamento?> GetEstacionamentoByIdAsync(int id)
    {
        return await _context.Estacionamentos
            .FirstOrDefaultAsync(e => e.Id == id && e.IsActive);
    }

    public async Task<Estacionamento> CreateEstacionamentoAsync(Estacionamento estacionamento)
    {
        estacionamento.CreatedAt = DateTime.UtcNow;
        estacionamento.UpdatedAt = DateTime.UtcNow;

        _context.Estacionamentos.Add(estacionamento);
        await _context.SaveChangesAsync();

        return estacionamento;
    }

    public async Task<Estacionamento?> UpdateEstacionamentoAsync(int id, UpdateEstacionamentoDto estacionamento)
    {
        var existingEstacionamento = await _context.Estacionamentos.FindAsync(id);

        if (existingEstacionamento == null)
            return null;

        existingEstacionamento.Nome = estacionamento.Nome;
        existingEstacionamento.Endereco = estacionamento.Endereco;
        existingEstacionamento.TotalVagas = estacionamento.TotalVagas;
        existingEstacionamento.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return existingEstacionamento;
    }

    public async Task<bool> DeleteEstacionamentoAsync(int id)
    {
        var estacionamento = await _context.Estacionamentos.FindAsync(id);

        if (estacionamento == null)
            return false;

        estacionamento.IsActive = false;
        estacionamento.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> EstacionamentoExistsAsync(int id)
    {
        return await _context.Estacionamentos.AnyAsync(e => e.Id == id && e.IsActive);
    }
}
