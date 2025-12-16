namespace Skeleton.Interfaces;

using Skeleton.Models;
using Skeleton.Utils.Models;

public interface IDiasSemanaService
{
    Task<PagedResult<DiasSemana>> GetAllDiasSemanaAsync(PaginationParams paginationParams);
    Task<DiasSemana?> GetDiaSemanaByIdAsync(int id);
     Task<DiasSemana> CreateDiaSemanaAsync(DiasSemana diaSemana);
    Task<bool> UpdateDiaSemanaAsync(int id, DiasSemana diaSemana);
    Task<bool> DeleteDiaSemanaAsync(int id);
}
