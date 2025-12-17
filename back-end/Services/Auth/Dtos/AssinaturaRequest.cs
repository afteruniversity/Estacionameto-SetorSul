namespace Skeleton.DTOs;

public class AssinaturaRequest
{
    public string? UsuarioId { get; set; }
    public List<string>? Dias { get; set; }
    public decimal ValorSemanal { get; set; }
    public string? DataInicio { get; set; }
    public string? DataFim { get; set; }
}
