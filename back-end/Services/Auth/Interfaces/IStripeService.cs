using Skeleton.DTOs;

namespace Skeleton.Interfaces;

public interface IStripeService
{
    Task<string> CriarSessaoCheckout(AssinaturaRequest request);
}
