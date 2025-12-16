using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Skeleton.Models;

[Table("dias_semana")]
public class DiasSemana
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("dia_semana")]
    public string DiaSemana { get; set; } = string.Empty;

}
