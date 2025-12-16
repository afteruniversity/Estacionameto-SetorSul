# 🅿️ Estacionamento Setor Sul API

Sistema de gerenciamento de estacionamento com autenticação JWT, gestão de usuários e endereços.

```
███████╗███████╗████████╗ █████╗  ██████╗██╗ ██████╗ ███╗   ██╗ █████╗ ███╗   ███╗███████╗███╗   ██╗████████╗ ██████╗ 
██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║██╔═══██╗████╗  ██║██╔══██╗████╗ ████║██╔════╝████╗  ██║╚══██╔══╝██╔═══██╗
█████╗  ███████╗   ██║   ███████║██║     ██║██║   ██║██╔██╗ ██║███████║██╔████╔██║█████╗  ██╔██╗ ██║   ██║   ██║   ██║
██╔══╝  ╚════██║   ██║   ██╔══██║██║     ██║██║   ██║██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   ██║   ██║
███████╗███████║   ██║   ██║  ██║╚██████╗██║╚██████╔╝██║ ╚████║██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ╚██████╔╝
╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ 
                                        SETOR SUL API
```

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Sistema completo de login/registro com tokens seguros
- 👤 **Gestão de Usuários** - CRUD completo com paginação e busca avançada
- 🏠 **Gestão de Endereços** - Múltiplos endereços por usuário
- 🔍 **Busca Avançada** - Busca por múltiplas colunas com paginação
- 📝 **Swagger/OpenAPI** - Documentação interativa da API
- 🔒 **Segurança** - Hash de senhas com BCrypt, soft delete
- 🏥 **Health Checks** - Monitoramento de saúde da API e banco de dados
- ⚡ **Alta Performance** - Connection pooling e retry policies

## 🚀 Tecnologias

- **.NET 8** - Framework principal
- **PostgreSQL** - Banco de dados relacional
- **Entity Framework Core 8** - ORM
- **JWT Bearer** - Autenticação
- **BCrypt.Net** - Hash de senhas
- **Swagger/OpenAPI** - Documentação

## 📋 Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL 12+](https://www.postgresql.org/download/)
- Editor de código (VS Code, Visual Studio, Rider)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/afteruniversity/Estacionameto-SetorSul.git
cd Estacionameto-SetorSul
```

### 2. Configure as variáveis de ambiente

Edite `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=estacionamento_setor_sul;Username=seu_usuario;Password=sua_senha"
  },
  "JwtSettings": {
    "Secret": "sua-chave-secreta-minimo-32-caracteres-mude-em-producao",
    "Issuer": "EstacionamentoSetorSulAPI",
    "Audience": "EstacionamentoSetorSulUsers",
    "ExpirationInMinutes": 60
  }
}
```

### 3. Instale as dependências

```bash
dotnet restore
```

### 4. Execute a aplicação

```bash
export ASPNETCORE_ENVIRONMENT=Development  # Linux/Mac
# ou
$env:ASPNETCORE_ENVIRONMENT="Development"  # Windows PowerShell

dotnet run
```

### 5. Acesse a documentação

Navegue para: `https://localhost:5229/skeleton/docs`

## 📚 Documentação da API

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Registrar novo usuário | Não |
| POST | `/api/auth/login` | Login e obter token JWT | Não |
| POST | `/api/auth/logout` | Invalidar token | Sim |
| GET | `/api/auth/me` | Obter dados do usuário atual | Sim |

### Usuários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/user` | Listar usuários (paginado) | Sim |
| GET | `/api/user/{id}` | Buscar usuário por ID | Sim |
| GET | `/api/user/{id}/with-enderecos` | Buscar usuário com endereços | Sim |
| GET | `/api/user/email/{email}` | Buscar por email | Sim |
| GET | `/api/user/username/{username}` | Buscar por username | Sim |
| POST | `/api/user` | Criar usuário | Sim |
| PUT | `/api/user/{id}` | Atualizar usuário | Sim |
| PATCH | `/api/user/{id}/toggle-active` | Ativar/desativar usuário | Sim |
| DELETE | `/api/user/{id}` | Deletar usuário (soft delete) | Sim |

### Endereços

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/enderecousuario/my-enderecos` | Buscar meus endereços | Sim |
| GET | `/api/enderecousuario/user/{userId}` | Buscar endereços de um usuário | Sim |
| GET | `/api/enderecousuario/{id}` | Buscar endereço por ID | Sim |
| POST | `/api/enderecousuario` | Criar endereço | Sim |
| PUT | `/api/enderecousuario/{id}` | Atualizar endereço | Sim |
| DELETE | `/api/enderecousuario/{id}` | Deletar endereço | Sim |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status da API |

## 🔑 Exemplos de Uso

### 1. Registrar usuário

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "joaosilva",
  "email": "joao@example.com",
  "password": "SenhaSegura123!",
  "firstName": "João",
  "lastName": "Silva"
}
```

### 2. Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@teste.com",
  "password": "123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "joaosilva",
  "email": "joao@example.com",
  "expiresAt": "2025-12-16T10:30:00Z"
}
```
