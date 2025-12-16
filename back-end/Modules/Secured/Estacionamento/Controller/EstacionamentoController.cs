namespace Skeleton.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Skeleton.Interfaces;
using Skeleton.DTOs;
using Skeleton.Utils.Models;
using Skeleton.Models;

// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class EstacionamentoController : ControllerBase
{
    private readonly IEstacionamentoService _estacionamentoService;

    public EstacionamentoController(IEstacionamentoService estacionamentoService)
    {
        _estacionamentoService = estacionamentoService;
    }

    // GET: api/estacionamento?pageNumber=1&pageSize=10
    [HttpGet]
    public async Task<ActionResult<PagedResult<Estacionamento>>> GetEstacionamentos([FromQuery] PaginationParams paginationParams)
    {
        var pagedEstacionamentos = await _estacionamentoService.GetAllEstacionamentosAsync(paginationParams);
        return Ok(pagedEstacionamentos);
    }

    // GET: api/estacionamento/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Estacionamento>> GetEstacionamento(int id)
    {
        var estacionamento = await _estacionamentoService.GetEstacionamentoByIdAsync(id);

        if (estacionamento == null)
            return NotFound();

        return Ok(estacionamento);
    }

    // POST: api/estacionamento
    [HttpPost]
    public async Task<ActionResult<Estacionamento>> CreateEstacionamento(Estacionamento estacionamento)
    {
        var createdEstacionamento = await _estacionamentoService.CreateEstacionamentoAsync(estacionamento);
        return CreatedAtAction(nameof(GetEstacionamento), new { id = createdEstacionamento.Id }, createdEstacionamento);
    }

    // PUT: api/estacionamento/5
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateEstacionamento(int id, UpdateEstacionamentoDto estacionamento)
    {
        var updatedEstacionamento = await _estacionamentoService.UpdateEstacionamentoAsync(id, estacionamento);
        if (updatedEstacionamento == null)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/estacionamento/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEstacionamento(int id)
    {
        var result = await _estacionamentoService.DeleteEstacionamentoAsync(id);

        if (!result)
            return NotFound();

        return NoContent();
    }
}
