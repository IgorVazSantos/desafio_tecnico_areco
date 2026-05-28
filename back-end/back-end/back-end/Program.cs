using back_end.Data;
using Microsoft.EntityFrameworkCore;
using products.Routes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var connectionString = builder.Configuration.GetConnectionString("PostgreSQLConnection");

builder.Services.AddDbContext<ProdutosContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("PermitirAngular");

app.PersonRoutes();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
