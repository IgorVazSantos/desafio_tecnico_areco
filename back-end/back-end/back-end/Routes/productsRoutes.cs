using back_end.Data;
using back_end.Models;
using produtos.Models;
using Microsoft.EntityFrameworkCore;


namespace products.Routes;

public static class PersonRoute {

    public static void PersonRoutes (this WebApplication app)
    {
        var route = app.MapGroup(prefix: "produtos");

        route.MapGet("", async (ProdutosContext context, int pagina = 1, int tamanhoPagina = 20) =>
        {
            if (pagina < 1) pagina = 1;
            if (tamanhoPagina < 1) tamanhoPagina = 20;

            int itensParaPular = (pagina - 1) * tamanhoPagina;

            var produtosPaginados = await context.Set<ProdutoModel>()
                .Where(p => p.DeletedAt == null)
                .Skip(itensParaPular)
                .Take(tamanhoPagina)
                .ToListAsync();

            return Results.Ok(produtosPaginados);
        });
        route.MapGet("{id:guid}", async (Guid id, ProdutosContext context) =>
        {
            var produto = await context.estoque
                .FirstOrDefaultAsync(p => p.Id == id && p.DeletedAt == null);

            if (produto == null)
            {
                return Results.NotFound(new { mensagem = "Produto não encontrado ou já foi excluído." });
            }

            return Results.Ok(produto);
        });
        route.MapPost("", async (ProdutosRequest req, ProdutosContext context) => 
        {
            if (req.QuantidadeEmEstoque < 0)
            {
                return Results.BadRequest(new { mensagem = "A quantidade inicial em estoque não pode ser menor que zero." });
            }

            var produto = new ProdutoModel(req.Nome);

            produto.Tipo = req.Tipo;
            produto.Descricao = req.Descricao;
            produto.PrecoUnitario = req.PrecoUnitario;
            produto.QuantidadeEmEstoque = req.QuantidadeEmEstoque;

            await context.AddAsync(produto);
            await context.SaveChangesAsync();

            return Results.Created($"/produtos/{produto.Id}", produto);
        });
        route.MapPut("{id:guid}", async (Guid id, AtualizarProdutoRequest req, ProdutosContext context) =>
        {
            var produtoExistente = await context.Set<ProdutoModel>()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (produtoExistente == null)
            {
                return Results.NotFound(new { mensagem = "Produto não encontrado." });
            }

            if (!string.IsNullOrWhiteSpace(req.Descricao))
                produtoExistente.Descricao = req.Descricao;

            produtoExistente.Nome = req.Nome;
            produtoExistente.Tipo = req.Tipo;
            produtoExistente.PrecoUnitario = req.PrecoUnitario;
            produtoExistente.QuantidadeEmEstoque = req.QuantidadeEmEstoque;

            await context.SaveChangesAsync();

            return Results.Ok(produtoExistente);
        });
        route.MapPatch("{id:guid}/estoque", async (Guid id, int novaQuantidade, ProdutosContext context) =>
        {
            // 1. VALIDAÇÃO: Bloqueia a execução se a nova quantidade for negativa
            if (novaQuantidade < 0)
            {
                return Results.BadRequest(new { mensagem = "A quantidade em estoque não pode ser menor que zero." });
            }

            // 2. Busca o produto no banco
            var produtoExistente = await context.Set<ProdutoModel>()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (produtoExistente == null)
            {
                return Results.NotFound(new { mensagem = "Produto não encontrado." });
            }

            // 3. Se passou na validação e o produto existe, atualiza o estoque
            produtoExistente.QuantidadeEmEstoque = novaQuantidade;

            // 4. Salva no banco de dados
            await context.SaveChangesAsync();

            return Results.Ok(produtoExistente);
        });
        route.MapDelete("{id:guid}", async (Guid id, ProdutosContext context) =>
        {
            var produtoExistente = await context.estoque
                .FirstOrDefaultAsync(p => p.Id == id && p.DeletedAt == null);

            if (produtoExistente == null)
            {
                return Results.NotFound(new { mensaje = "Produto não encontrado." });
            }

            produtoExistente.DeletedAt = DateTime.UtcNow;
            produtoExistente.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}