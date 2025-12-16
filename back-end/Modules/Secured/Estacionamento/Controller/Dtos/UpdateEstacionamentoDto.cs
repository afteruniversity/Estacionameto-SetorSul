namespace Skeleton.DTOs;

public class UpdateEstacionamentoDto
{
    public string Nome { get; set; } = string.Empty;

    public string Endereco { get; set; } = string.Empty;

    public int TotalVagas { get; set; }
}
