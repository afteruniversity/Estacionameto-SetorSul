namespace Skeleton.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skeleton.DTOs;
using Skeleton.Models;
using Skeleton.Services;
using Skeleton.Interfaces;
using System.Security.Claims;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EnderecoUsuarioController : ControllerBase
{
    private readonly IEnderecoUsuarioService _enderecoService;

    public EnderecoUsuarioController(IEnderecoUsuarioService enderecoService)
    {
        _enderecoService = enderecoService;
    }

    // GET: api/enderecousuario/user/{userId}
    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<EnderecoUsuario>>> GetEnderecosByUserId(int userId)
    {
        var enderecos = await _enderecoService.GetAllEnderecosByUserIdAsync(userId);
        return Ok(enderecos);
    }

    // GET: api/enderecousuario/my-enderecos
    [HttpGet("my-enderecos")]
    public async Task<ActionResult<IEnumerable<EnderecoUsuario>>> GetMyEnderecos()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var enderecos = await _enderecoService.GetAllEnderecosByUserIdAsync(userId);
        return Ok(enderecos);
    }

    // GET: api/enderecousuario/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<EnderecoUsuario>> GetEndereco(int id)
    {
        var endereco = await _enderecoService.GetEnderecoByIdAsync(id);

        if (endereco == null)
            return NotFound();

        return Ok(endereco);
    }

    // POST: api/enderecousuario
    [HttpPost]
    public async Task<ActionResult<EnderecoUsuario>> CreateEndereco(CreateEnderecoDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var endereco = new EnderecoUsuario
        {
            UserId = userId,
            Logradouro = dto.Logradouro,
            Numero = dto.Numero,
            Cep = dto.Cep,
            Complemento = dto.Complemento,
            Bairro = dto.Bairro
        };

        var createdEndereco = await _enderecoService.CreateEnderecoAsync(endereco);
        return CreatedAtAction(nameof(GetEndereco), new { id = createdEndereco.Id }, createdEndereco);
    }

    // PUT: api/enderecousuario/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEndereco(int id, UpdateEnderecoDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        // Verifica se o usuário é dono do endereço
        if (!await _enderecoService.UserOwnsEnderecoAsync(userId, id))
            return Forbid();

        var endereco = new EnderecoUsuario
        {
            Logradouro = dto.Logradouro,
            Numero = dto.Numero,
            Cep = dto.Cep,
            Complemento = dto.Complemento,
            Bairro = dto.Bairro
        };

        var updatedEndereco = await _enderecoService.UpdateEnderecoAsync(id, endereco);

        if (updatedEndereco == null)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/enderecousuario/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEndereco(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        // Verifica se o usuário é dono do endereço
        if (!await _enderecoService.UserOwnsEnderecoAsync(userId, id))
            return Forbid();

        var result = await _enderecoService.DeleteEnderecoAsync(id);

        if (!result)
            return NotFound();

        return NoContent();
    }
}
