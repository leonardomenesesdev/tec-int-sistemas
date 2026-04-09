# API de Gestão de Usuários e Veículos

API RESTful desenvolvida com Node.js e Express para gerenciamento de usuários e veículos, com autenticação JWT e controle de acesso por perfil.

---

## URL Base

[https://tec-int-sistemas.onrender.com/api](https://tec-int-sistemas.onrender.com/api)

Todas as rotas partem desta URL base.

---

## Como testar a API

Você pode testar os endpoints usando ferramentas como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), [Bruno](https://www.usebruno.com/).

---

## Autenticação

As rotas protegidas exigem o token JWT no cabeçalho da requisição:

```
Authorization: Bearer <seu_token_jwt>
```

Rotas marcadas com 🔒 exigem autenticação. Rotas marcadas com 👷 exigem que o usuário seja **funcionário**.

---

## Rotas de Usuário `/api/users`

### Cadastro de Usuário [POST]

- Rota: `POST /users/register`
- Body:
  ```json
  {
    "name": "Fulano de Tal",
    "email": "f@example.com",
    "password": "123456",
    "dataNascimento": "1995-01-01T00:00:00Z",
    "isFuncionario": false
  }
  ```
- Resposta:
  ```json
  {
    "id": 7,
    "name": "Fulano de Tal",
    "email": "f@example.com",
    "password": "$2b$10$o8qlwT4NKSww1P7lC/TIpuNIXlhsFT5uNjwgSLQ.O1P5g/KWwzbpK",
    "isFuncionario": false,
    "matricula": null,
    "isClienteRecorrente": false,
    "dataNascimento": "1995-01-01T00:00:00.000Z",
    "createdAt": "2026-04-09T09:43:08.929Z",
    "updatedAt": "2026-04-09T09:43:08.929Z"
  }
  ```

---

### Login de Usuário [POST]

- Rota: `POST /users/login`
- Body:
  ```json
  {
    "email": "f@example.com",
    "password": "123456"
  }
  ```
- Resposta:
  ```json
  {
    "email": "f@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

> O token retornado deve ser armazenado, pois as demais rotas são protegidas.

---

### Listar Todos os Usuários [GET] 🔒👷

- Rota: `GET /users`
- Resposta:
  ```json
   [
    {
      "id": 2,
      "name": "levi ruivo",
      "email": "levi@example.com",
      "dataNascimento": "1995-01-01T00:00:00.000Z",
      "isFuncionario": true
    },
    {
      "id": 1,
      "name": "leonardo meneses",
      "email": "leo@email.com",
      "dataNascimento": "1995-01-01T00:00:00.000Z",
      "isFuncionario": false
    },
    {
      "id": 4,
      "name": "teste",
      "email": "t@example.com",
      "dataNascimento": "1995-01-01T00:00:00.000Z",
      "isFuncionario": false
    },
    {
      "id": 5,
      "name": "matheus",
      "email": "m@example.com",
      "dataNascimento": "1995-01-01T00:00:00.000Z",
      "isFuncionario": false
    },
    {
      "id": 7,
      "name": "Fulano de Tal",
      "email": "f@example.com",
      "dataNascimento": "1995-01-01T00:00:00.000Z",
      "isFuncionario": false
    }
  ]
  ```

---

### Buscar Usuário por ID [GET] 🔒👷

- Rota: `GET /users/:id`
- Resposta:
  ```json
  {
    "id": 7,
    "name": "Fulano de Tal",
    "email": "f@example.com",
    "dataNascimento": "1995-01-01T00:00:00.000Z",
    "isFuncionario": false
  }
  ```

---

### Atualizar Funcionário [PUT] 🔒👷

- Rota: `PUT /users/funcionario/:id`
- Body:
  ```json
  {
    "name": "Fulano Atualizado",
    "email": "novo@example.com",
    "dataNascimento": "1995-01-01T00:00:00Z",
    "isFuncionario": true,
    "matricula": "MAT-001"
  }
  ```
- Resposta:
  ```json
  {
    "name": "Fulano Atualizado",
    "email": "novo@example.com",
    "dataNascimento": "1995-01-01T00:00:00Z",
    "isFuncionario": true,
    "matricula": "MAT-001"
  }
  ```

---

### Atualizar Cliente [PUT] 🔒

- Rota: `PUT /users/cliente/:id`
- Body:
  ```json
  {
    "name": "Fulano Atualizado",
    "email": "leo@email.com",
    "dataNascimento": "1995-01-01T00:00:00Z"
  }
  ```
- Resposta:
  ```json
  {
    "id": 1,
    "name": "Fulano Atualizado",
    "email": "leo@email.com"
  }
  ```

> Todos os campos são opcionais. Somente o próprio usuário ou um funcionário pode realizar esta ação.

---

### Atualizar Senha [PATCH] 🔒

- Rota: `PATCH /users/:id/password`
- Body:
  ```json
  {
    "newPassword": "1234567"
  }
  ```

> Somente o próprio usuário pode alterar sua senha.

---

### Deletar Usuário [DELETE] 🔒

- Rota: `DELETE /users/:id`

> Somente o próprio usuário pode deletar sua conta.

---

## Rotas de Veículo `/veiculos`

### Cadastrar Veículo [POST] 🔒👷

- Rota: `POST /veiculos`
- Body:
  ```json
  {
    "placa": "ABC-1546",
    "modelo": "Civic",
    "marca": "Honda",
    "ano": 2022,
    "cor": "Preto",
    "quilometragem": "15000",
    "isAutomatico": true,
    "isDisponivel": true,
    "tipo": "CARRO"
  }
  ```

> `tipo` aceita apenas `CARRO` ou `MOTO`.

---

### Listar Todos os Veículos [GET] 🔒

- Rota: `GET /veiculos`
- Resposta:
  ```json
  [
    {
      "placa": "ABC-1234",
      "modelo": "Corolla",
      "marca": "Toyota",
      "ano": 2025,
      "cor": "Preta",
      "quilometragem": "15000",
      "tipo": "CARRO",
      "isAutomatico": true,
      "isDisponivel": false
    },
    {
      "placa": "ABC-1546",
      "modelo": "Civic",
      "marca": "Honda",
      "ano": 2022,
      "cor": "Preto",
      "quilometragem": "15000",
      "tipo": "CARRO",
      "isAutomatico": true,
      "isDisponivel": true
    },
    {
      "placa": "ABC-1265",
      "modelo": "City",
      "marca": "Honda",
      "ano": 2025,
      "cor": "Preto",
      "quilometragem": "15000",
      "tipo": "CARRO",
      "isAutomatico": true,
      "isDisponivel": true
    }
  ]
  ```

---

### Buscar Veículo por Placa [GET] 🔒

- Rota: `GET /veiculos/:placa`
- Resposta:
  ```json
  {
    "id": 10,
    "placa": "ABC-1546",
    "modelo": "Civic",
    "marca": "Honda",
    "ano": 2022,
    "cor": "Preto",
    "quilometragem": "15000",
    "tipo": "CARRO",
    "isAutomatico": true,
    "isDisponivel": true
  }
  ```

---

### Atualizar Veículo [PUT] 🔒👷

- Rota: `PUT /veiculos/:placa`
- Body:
  ```json
  {
    "cor": "Vermelho",
    "quilometragem": "18000",
    "isDisponivel": true
  }
  ```

> Todos os campos são opcionais. Envie apenas o que deseja atualizar.

---

### Deletar Veículo [DELETE] 🔒👷

- Rota: `DELETE /api/veiculos/:placa`
- Resposta esperada:
  ```json
   {
    "message": "Veículo deletado com sucesso!",
    "veiculo": {
      "id": 10,
      "placa": "ABC-1546",
      "modelo": "Civic",
      "marca": "Honda",
      "ano": 2022,
      "cor": "Vermelho",
      "quilometragem": "18000",
      "isAutomatico": true,
      "isDisponivel": true,
      "tipo": "CARRO",
      "createdAt": "2026-04-09T10:09:17.506Z",
      "updatedAt": "2026-04-09T10:16:04.884Z"
    }
  }
---

## Rotas de Alocação `/alocacoes`

### Registrar Alocação [POST] 🔒

- Rota: `POST /alocacoes`
- Body:
  ```json
  {
    "placa": "ABC-1265",
    "dataAlocacao": "2026-04-08T10:00:00",
    "valorTotal": 350.00
  }
  ```
- Resposta:
  ```json
    {
    "id": 7,
    "clienteId": 7,
    "veiculoId": 11,
    "dataAlocacao": "2026-04-08T13:00:00.000Z",
    "dataDevolucao": null,
    "valorTotal": 350,
    "isAtiva": true,
    "createdAt": "2026-04-09T10:20:40.320Z",
    "updatedAt": "2026-04-09T10:20:40.320Z",
    "cliente": {
      "id": 7,
      "name": "Fulano Atualizado",
      "email": "novo@example.com"
    },
    "veiculo": {
      "id": 11,
      "placa": "ABC-1265",
      "modelo": "City",
      "marca": "Honda"
    }
  }
  ```

> O cliente é identificado automaticamente pelo token JWT. Um cliente não pode ter mais de uma alocação ativa ao mesmo tempo. O veículo é marcado como indisponível automaticamente.

---

### Listar Todas as Alocações [GET] 🔒👷

- Rota: `GET /alocacoes`

---

### Listar Alocações Ativas [GET] 🔒👷

- Rota: `GET /alocacoes/ativas`

---

### Listar Alocações por Cliente [GET] 🔒👷

- Rota: `GET /alocacoes/cliente/:clienteId`

---

### Buscar Alocação por ID [GET] 🔒👷

- Rota: `GET /alocacoes/:id`

---

### Registrar Devolução [PATCH] 🔒👷

- Rota: `PATCH /alocacoes/:id/devolucao`
- Body:
  ```json
  {
    "dataDevolucao":"2026-04-08T17:00:00"
  }
  ```
- Resposta:
  ```json
  {
    "id": 8,
    "clienteId": 7,
    "veiculoId": 11,
    "dataAlocacao": "2026-04-08T13:00:00.000Z",
    "dataDevolucao": "2026-04-09T10:40:48.795Z",
    "valorTotal": 350,
    "isAtiva": false,
    "createdAt": "2026-04-09T10:39:44.185Z",
    "updatedAt": "2026-04-09T10:40:48.862Z",
    "cliente": {
      "id": 7,
      "name": "Fulano Atualizado",
      "email": "novo@example.com"
    },
    "veiculo": {
      "id": 11,
      "placa": "ABC-1265",
      "modelo": "City",
      "marca": "Honda"
    }
  }
  ```

> O veículo é liberado automaticamente (`isDisponivel: true`).

---

### Atualizar Alocação [PUT] 🔒👷

- Rota: `PUT /alocacoes/:id`
- Body:
  ```json
  {
    "valorTotal": 500.00
  }
  ```
- Resposta:
  ```json
  {
    "id": 8,
    "clienteId": 7,
    "veiculoId": 11,
    "dataAlocacao": "2026-04-08T13:00:00.000Z",
    "dataDevolucao": "2026-04-09T10:40:48.795Z",
    "valorTotal": 500,
    "isAtiva": false,
    "createdAt": "2026-04-09T10:39:44.185Z",
    "updatedAt": "2026-04-09T10:42:36.679Z",
    "cliente": {
      "id": 7,
      "name": "Fulano Atualizado",
      "email": "novo@example.com"
    },
    "veiculo": {
      "id": 11,
      "placa": "ABC-1265",
      "modelo": "City",
      "marca": "Honda"
    }
  }
  ```

> Campos aceitos: `dataAlocacao`, `dataDevolucao`, `valorTotal`. Todos opcionais. Não é possível alterar o status (`isAtiva`) por esta rota.

---

### Deletar Alocação [DELETE] 🔒👷

- Rota: `DELETE /alocacoes/:id`
- Resposta:
- ```json
  {
    "message": "Alocação deletada com sucesso!",
    "alocacao": {
      "id": 8,
      "clienteId": 7,
      "veiculoId": 11,
      "dataAlocacao": "2026-04-08T13:00:00.000Z",
      "dataDevolucao": "2026-04-09T10:40:48.795Z",
      "valorTotal": 500,
      "isAtiva": false,
      "createdAt": "2026-04-09T10:39:44.185Z",
      "updatedAt": "2026-04-09T10:42:36.679Z"
    }
  }
  ```

---

## Observações Gerais

- **`isAtiva`** é gerenciado automaticamente: `true` ao criar, `false` ao devolver.
- **`isDisponivel`** do veículo é gerenciado automaticamente: `false` ao alocar, `true` ao devolver ou deletar uma alocação ativa.
- Um cliente **não pode ter mais de uma alocação ativa** simultaneamente.
- Um veículo **não pode ser alocado** se `isDisponivel` for `false`.
- O token JWT expira em **1 hora**. Após isso, faça login novamente para obter um novo token.
