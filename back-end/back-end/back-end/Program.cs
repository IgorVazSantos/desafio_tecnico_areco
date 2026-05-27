using back_end.Data;
using Microsoft.EntityFrameworkCore;
using products.Routes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();




// Captura a string de conexão do appsettings.json
var connectionString = builder.Configuration.GetConnectionString("PostgreSQLConnection");

// Registra o DbContext usando o provedor do Npgsql
builder.Services.AddDbContext<ProdutosContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();








var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.PersonRoutes();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
