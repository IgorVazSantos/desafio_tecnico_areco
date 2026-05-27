namespace back_end.Models
{
    public record ProdutosRequest(
        string Nome,
        string Tipo,
        string Descricao,
        decimal PrecoUnitario,
        int QuantidadeEmEstoque
    );
    public record AtualizarProdutoRequest(
        string Nome,
        string Tipo,
        string Descricao,
        decimal PrecoUnitario,
        int QuantidadeEmEstoque);
}
