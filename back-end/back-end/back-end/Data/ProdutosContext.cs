using Microsoft.EntityFrameworkCore;
using produtos.Models;

namespace back_end.Data
{
    public class ProdutosContext : DbContext
    {       
        public ProdutosContext(DbContextOptions<ProdutosContext> options) : base(options){ }

        public DbSet<ProdutoModel> estoque { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entradas = ChangeTracker.Entries<ProdutoModel>();

            foreach (var entrada in entradas)
            {
                if (entrada.State == EntityState.Added)
                {
                    entrada.Entity.CreatedAt = DateTime.UtcNow;
                    entrada.Entity.UpdatedAt = DateTime.UtcNow;
                }
                else if (entrada.State == EntityState.Modified)
                {
                    entrada.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}