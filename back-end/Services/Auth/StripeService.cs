namespace Skeleton.Services;

using Microsoft.Extensions.Options;
using Skeleton.DTOs;
using Skeleton.Interfaces;
using Stripe;
using Stripe.Checkout;

public class StripeService : IStripeService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<StripeService> _logger;

    public StripeService(IConfiguration configuration, ILogger<StripeService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<string> CriarSessaoCheckout(AssinaturaRequest request)
    {
        try
        {
            // Calcular valor total em centavos (Stripe trabalha com centavos)
            long amountInCents = (long)(request.ValorSemanal * 100);

            // Descrição do produto
            var descricao = $"Plano de estacionamento - {request.Dias?.Count ?? 0} dias";
            if (!string.IsNullOrEmpty(request.DataInicio) && !string.IsNullOrEmpty(request.DataFim))
            {
                descricao += $" ({request.DataInicio} até {request.DataFim})";
            }

            // Criar os line items para a sessão de checkout
            var lineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    Quantity = 1,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = amountInCents,
                        Currency = "brl",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "Assinatura de Estacionamento",
                            Description = descricao
                        }
                    }
                }
            };

            // Configurar URLs de sucesso e cancelamento
            var domainUrl = _configuration["Stripe:DomainUrl"] ?? "http://localhost:3000";
            var successUrl = $"{domainUrl}/dashboard/plans?session_id={{CHECKOUT_SESSION_ID}}";
            var cancelUrl = $"{domainUrl}/dashboard/plans?canceled=true";

            // Criar a sessão de checkout
            var sessionOptions = new SessionCreateOptions
            {
                Mode = "payment",
                LineItems = lineItems,
                SuccessUrl = successUrl,
                CancelUrl = cancelUrl,
                Metadata = new Dictionary<string, string>
                {
                    { "usuario_id", request.UsuarioId ?? "unknown" },
                    { "tipo_assinatura", "estacionamento" }
                }
            };


            var sessionService = new SessionService();
            var session = await sessionService.CreateAsync(sessionOptions);

            _logger.LogInformation($"Sessão de checkout criada com sucesso: {session.Id}");

            return session.Url ?? string.Empty;
        }
        catch (StripeException ex)
        {
            _logger.LogError($"Erro Stripe: {ex.Message}");
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Erro ao criar sessão de checkout: {ex.Message}");
            throw;
        }
    }
}
