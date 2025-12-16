using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Skeleton.Models;

[Table("estacionamentos")]
public class Estacionamento
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    
    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Column("endereco")]
    public string Endereco { get; set; } = string.Empty;

    [Column("total_vagas")]
    public int TotalVagas { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }
    



}
