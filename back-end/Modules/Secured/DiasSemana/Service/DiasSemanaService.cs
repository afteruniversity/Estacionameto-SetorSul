namespace Skeleton.Services;

using Microsoft.EntityFrameworkCore;
using Skeleton.Interfaces;
using Skeleton.Models;
using Skeleton.Utils.Models;

public class DiasSemanaService : IDiasSemanaService
{
    private readonly ApplicationDbContext _context;

    public DiasSemanaService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<DiasSemana>> GetAllDiasSemanaAsync(
        PaginationParams paginationParams)
    {
        return await _context.DiasSemana
            .OrderBy(d => d.Id)
            .ToPaginatedListAsync(paginationParams);
    }

    public async Task<DiasSemana?> GetDiaSemanaByIdAsync(int id)
    {
        return await _context.DiasSemana
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<DiasSemana> CreateDiaSemanaAsync(DiasSemana diaSemana)
    {
        _context.DiasSemana.Add(diaSemana);
        await _context.SaveChangesAsync();
        return diaSemana;
    }

    public async Task<bool> UpdateDiaSemanaAsync(int id, DiasSemana diaSemana)
    {
        var existing = await _context.DiasSemana.FindAsync(id);
        if (existing == null)
            return false;

        existing.DiaSemana = diaSemana.DiaSemana;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteDiaSemanaAsync(int id)
    {
        var diaSemana = await _context.DiasSemana.FindAsync(id);
        if (diaSemana == null)
            return false;

        _context.DiasSemana.Remove(diaSemana);
        await _context.SaveChangesAsync();
        return true;
    }
}
