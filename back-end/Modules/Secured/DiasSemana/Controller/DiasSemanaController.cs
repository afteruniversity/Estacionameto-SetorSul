namespace Skeleton.Controllers;

using Microsoft.AspNetCore.Mvc;
using Skeleton.Interfaces;
using Skeleton.Utils.Models;
using Skeleton.Models;

// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class DiasSemanaController : ControllerBase
{
    private readonly IDiasSemanaService _diasSemanaService;

    public DiasSemanaController(IDiasSemanaService diasSemanaService)
    {
        _diasSemanaService = diasSemanaService;
    }


    [HttpGet]
    public async Task<ActionResult<PagedResult<DiasSemana>>> GetDiasSemana(
        [FromQuery] PaginationParams paginationParams)
    {
        var diasSemana = await _diasSemanaService
            .GetAllDiasSemanaAsync(paginationParams);

        return Ok(diasSemana);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<DiasSemana>> GetDiaSemana(int id)
    {
        var diaSemana = await _diasSemanaService
            .GetDiaSemanaByIdAsync(id);

        if (diaSemana == null)
            return NotFound();

        return Ok(diaSemana);
    }

    [HttpPost]
    public async Task<ActionResult<DiasSemana>> CreateDiaSemana(DiasSemana diaSemana)
    {
        var created = await _diasSemanaService
            .CreateDiaSemanaAsync(diaSemana);

        return CreatedAtAction(
            nameof(GetDiaSemana),
            new { id = created.Id },
            created
        );
    }

    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiaSemana(int id, DiasSemana diaSemana)
    {
        var updated = await _diasSemanaService
            .UpdateDiaSemanaAsync(id, diaSemana);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDiaSemana(int id)
    {
        var deleted = await _diasSemanaService
            .DeleteDiaSemanaAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
