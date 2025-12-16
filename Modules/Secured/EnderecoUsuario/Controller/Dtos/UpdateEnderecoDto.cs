namespace Skeleton.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateEnderecoDto
{
    [Required]
    [MaxLength(255)]
    public string Logradouro { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Numero { get; set; } = string.Empty;

    [Required]
    [Range(10000, 99999999)]
    public int Cep { get; set; }

    [MaxLength(255)]
    public string? Complemento { get; set; }

    [Required]
    [MaxLength(100)]
    public string Bairro { get; set; } = string.Empty;
}
