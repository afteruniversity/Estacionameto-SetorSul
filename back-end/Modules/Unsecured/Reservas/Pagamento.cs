using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Skeleton.Models;

[Table("pagamentos")]
public class Pagamentos
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("reserva_id")]
    public int ReservaId { get; set; }

    [Column("valor")]
    public int Valor { get; set; }

    [Column("metado")]
    public int Metado { get; set; }

    [Column("status")]
    public string Status { get; set; } = string.Empty;

    [Column("data_pagamento")]
    public DateTime DataPagamento { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

}
