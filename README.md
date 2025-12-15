# 🎬 Movie Awards API

API desenvolvida em NestJS para consultar produtores com o menor e maior intervalo entre prêmios recebidos.

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de executar o projeto, é necessário ter o **Yarn** instalado na sua máquina.

Caso ainda não tenha o Yarn, instale-o globalmente com o comando:
```bash
npm install -g yarn
```

#### 📦 Instalação das dependências
```bash
yarn install
```

### ▶️ Executando a aplicação
Para iniciar a aplicação localmente, execute:
```bash
yarn start
```

### A API estará disponível em:
- http://localhost:3000

## 📄 Documentação da API (Swagger)

Com a aplicação em execução, é possível acessar a documentação Swagger através da URL:
```bash
http://localhost:3000/swagger
```

# 🧪 Testes

Testes de integração (E2E)

Para rodar os testes de integração (end-to-end), execute:
```bash
yarn test:e2e
```

# 📄 Atualização dos dados (CSV)

Os dados utilizados pela aplicação são carregados a partir de um arquivo CSV.

Caso seja necessário alterar os dados, basta editar o arquivo:
```bash
/data/movies.csv
```
# 🛠️ Tecnologias utilizadas
	•	Node.js
	•	NestJS
	•	TypeScript
	•	TypeORM
	•	Banco de dados em memória
	•	Swagger (OpenAPI)
	•	Jest + Supertest (testes E2E)