using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Skeleton.Models;

[Table("endereco_usuarios")]
public class EnderecoUsuario
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("user_id")]
    public int UserId { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("logradouro")]
    public string Logradouro { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    [Column("numero")]
    public string Numero { get; set; } = string.Empty;

    [Required]
    [Column("cep")]
    public int Cep { get; set; }

    [MaxLength(255)]
    [Column("complemento")]
    public string? Complemento { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("bairro")]
    public string Bairro { get; set; } = string.Empty;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    [JsonIgnore]
    public User? User { get; set; }
}
