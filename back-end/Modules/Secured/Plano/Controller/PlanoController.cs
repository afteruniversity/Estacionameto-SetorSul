namespace Skeleton.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skeleton.DTOs;
using Skeleton.Interfaces;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PlanoController : ControllerBase
{
    private readonly IStripeService _stripeService;

    public PlanoController(IStripeService stripeService)
    {
        _stripeService = stripeService;
    }

    [HttpPost("criar-checkout")]
    public async Task<IActionResult> CriarCheckout([FromBody] AssinaturaRequest request)
    {
        try
        {
            if (request == null)
                return BadRequest(new { message = "Dados da assinatura são obrigatórios" });

            // Validar dados obrigatórios
            if (string.IsNullOrEmpty(request.UsuarioId) || 
                request.Dias == null || 
                request.Dias.Count == 0 || 
                request.ValorSemanal <= 0 ||
                string.IsNullOrEmpty(request.DataInicio) ||
                string.IsNullOrEmpty(request.DataFim))
                return BadRequest(new { message = "Todos os campos são obrigatórios" });

            // Criar sessão de checkout no Stripe
            var checkoutUrl = await _stripeService.CriarSessaoCheckout(request);

            if (string.IsNullOrEmpty(checkoutUrl))
                return BadRequest(new { message = "Erro ao criar sessão de pagamento" });

            return Ok(new { url = checkoutUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Erro interno: {ex.Message}" });
        }
    }
}
