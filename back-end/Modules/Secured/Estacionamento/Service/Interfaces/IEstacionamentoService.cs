namespace Skeleton.Interfaces;

using Skeleton.DTOs;
using Skeleton.Models;
using Skeleton.Utils.Models;

public interface IEstacionamentoService
{
    Task<PagedResult<Estacionamento>> GetAllEstacionamentosAsync(PaginationParams paginationParams);
    Task<Estacionamento?> GetEstacionamentoByIdAsync(int id);
    Task<Estacionamento> CreateEstacionamentoAsync(Estacionamento estacionamento);
    Task<Estacionamento?> UpdateEstacionamentoAsync(int id, UpdateEstacionamentoDto estacionamento);
    Task<bool> DeleteEstacionamentoAsync(int id);
    Task<bool> EstacionamentoExistsAsync(int id);
}
