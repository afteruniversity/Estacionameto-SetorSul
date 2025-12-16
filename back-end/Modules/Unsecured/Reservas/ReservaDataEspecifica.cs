using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Skeleton.Models;

[Table("reservas_datas_especificas")]
public class ReservasDatasEspecificas
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("reserva_id")]
    public int ReservaId { get; set; }

    [Column("data")]
    public DateTime Data { get; set; }

}
