using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Skeleton.Models
{
    [Table("planos")]
    public class Plano
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("tipo")]
        public string Tipo { get; set; } = string.Empty; // 'semanal', 'mensal', 'avulso'

        [Column("quantidade_dias_semana")]
        public int? QuantidadeDiasSemana { get; set; }

        [Required]
        [Column("preco", TypeName = "decimal(10,2)")]
        public decimal Preco { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property - users who have this plan
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
