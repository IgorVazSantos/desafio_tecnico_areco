using Microsoft.AspNetCore.Http.HttpResults;

namespace produtos.Models;
    public class ProdutoModel
    {


        public ProdutoModel(string nome)
        {
            Nome = nome;
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
    }        
        public Guid Id { get; init; }
        public string Nome { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal PrecoUnitario { get; set; }
        public int QuantidadeEmEstoque { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

}
