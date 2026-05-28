# Sistema de Controle de Estoque (Full-Stack)

> API robusta para gerenciamento de produtos e estoque integrada a uma interface SPA responsiva.

---

## Sobre o Projeto

Este é um projeto full-stack desenvolvido para o teste técnico da vaga de Desenvolvedor Web na empresa Areco. Esse projeto tem como objetivo resolver problemas de gerenciamento de estoque e produtos. O sistema conta com uma API REST centralizada que expõe os dados de forma segura e performática, consumida por uma aplicação front-end dinâmica.

---
[V0 - 26/05/2026]

## Tecnologias Utilizadas

### **Back-End**
* **Plataforma:** .NET 10 (C#);
* **Framework Web:** ASP.NET Core Web API (Minimal APIs / Controllers);
* **ORM:** Entity Framework Core (EF Core);
* **Banco de Dados:** PostgreSQL.

### **Front-End**
* **Framework**: Angular 21 (@angular/core: ^21.2.0);
* **Estilização**: Tailwind CSS na versão 4 (tailwindcss: ^4.1.12), processado via PostCSS.
---

## Arquitetura do Projeto

O projeto está dividido para garantir a separação de responsabilidades:

1. **/backend**: API responsável pelas regras de negócio, rotas de produtos, conexão com o banco de dados PostgreSQL e tratamento de CORS para o ecossistema Angular.
2. **/frontend**: Aplicação Angular SPA que renderiza a interface do usuário e interage com os endpoints da API.

---

## Como Executar o Projeto

### **Pré-requisitos**
Antes de começar, certifique-se de ter instalado em sua máquina:
* [SDK do .NET 10](https://dotnet.microsoft.com/en-us/download/dotnet/10.0);
* [Node.js & Angular CLI](https://nodejs.org/) (Para o front-end);
* Instância do [PostgreSQL](https://www.postgresql.org/) ativo localmente.

---

### 1. Clonando o Repositório

```bash
# Clone este repositório
$ git clone (https://github.com/IgorVazSantos/desafio_tecnico_areco.git)

# Acesse a pasta do projeto
$ cd seu-repositorio
```

## Configurando o Back-End (.NET 10)

``` Bash
# Acesse a pasta do back-end
$ cd desafio_tenico_areco/back-end/back-end/back-end

# Restaure as dependências do projeto
$ dotnet restore

# Configure a sua string de conexão no arquivo 'appsettings.json' se necessário
"ConnectionStrings": {
  "PostgreSQLConnection": "Host=localhost;Port=sua_porta;Database=estoque;Username=seu_usuario;Password=sua_senha"
}
# O padrão configurado está apontando para o banco 'estoque' no localhost

# Execute as migrações para criar o banco de dados e as tabelas
$ dotnet ef database update

# Inicie o servidor back-end
$ dotnet run
```

## Inicializando o Front-end (Angular)

``` Bash
cd front-end
# 1. Instalar os módulos e dependências do Node (incluindo Angular, Tailwind e Vitest)
npm install

# 2. Iniciar o servidor de desenvolvimento local
ng serve
```

## Autor
Desenvolvido por Igor Vaz

LinkedIn: https://www.linkedin.com/in/igor-gabriel-vaz-dos-santos/

GitHub: https://github.com/IgorVazSantos