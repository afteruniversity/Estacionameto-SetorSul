namespace Skeleton.Interfaces;

using Skeleton.Models;

public interface IEnderecoUsuarioService
{
    Task<IEnumerable<EnderecoUsuario>> GetAllEnderecosByUserIdAsync(int userId);
    Task<EnderecoUsuario?> GetEnderecoByIdAsync(int id);
    Task<EnderecoUsuario> CreateEnderecoAsync(EnderecoUsuario endereco);
    Task<EnderecoUsuario?> UpdateEnderecoAsync(int id, EnderecoUsuario endereco);
    Task<bool> DeleteEnderecoAsync(int id);
    Task<bool> EnderecoExistsAsync(int id);
    Task<bool> UserOwnsEnderecoAsync(int userId, int enderecoId);
}
