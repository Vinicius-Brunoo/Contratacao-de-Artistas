# Contratacao-de-Artistas

# PROJETO ESTÁGIO ENTERSCIENCE

## 💡 Enredo:

O cliente solicita que você crie uma aplicação web para a contratação de artistas para shows particulares. Crie uma página, onde há um campo de pesquisa, este campo de pesquisa deve buscar por artistas (bandas e cantores), o resultado deve exibir uma grade ou listagem para que o usuário possa escolher um dos resultados. Ao escolher um dos resultados, o usuário deve ser levado a um formulário, que colete informações sobre a contratação do artista selecionado, contendo os campos: Nome do contratante\*, Artista Selecionado\*, Cachê, Data do evento\* e Endereço. A submissão do formulário deve ser registrada e uma tela de sucesso exibida. O usuário poderá repetir o processo de contratação quantas vezes quiser e também consultar as contratações submetidas anteriormente.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local.

## 👋 Pré-requisitos

Você precisará ter instalado na sua máquina:

- Node.js e NPM
- Git
- PHP e Composer

## 🔧 Instalação - Back-End

### 1. Clonando o projeto

Execute o comando no seu terminal para clonar o repositório:

```bash
 git clone https://github.com/Vinicius-Brunoo/Contratacao-de-Artistas.git
 cd ProjetoEnterScience
```

### 2. Preparando as dependências

Entre na pasta do backend e instale as dependências:

```bash
 cd backend
 composer install
 cp .env.example .env
```

Edite o arquivo `.env` para configurar as credenciais do banco de dados.
Gere a chave da aplicação:

```bash
 php artisan key:generate
```

Execute as migrações e popule o banco de dados:

```bash
 php artisan migrate --seed
```

### 3. Ambiente de desenvolvimento

- Iniciar servidor Back-End:
  ```bash
  php artisan serve
  ```
- O backend estará rodando na porta 8000.

## 🔧 Instalação - Front-End React

### 1. Preparando as dependências

Entre na pasta do frontend e instale as dependências:

```bash
 cd ../front
 npm install
 cp .env
```

Edite o `.env` para configurar a URL da API Laravel e credenciais da API do Spotify.

### 2. Ambiente de desenvolvimento

- Inicie o servidor frontend:
  ```bash
  npm run dev
  ```
- Acesse no navegador:
  ```
  Local: http://localhost:5173/
  ```

## 🔒 Variáveis de Ambiente

Durante o processo seletivo da EnterScience, as variáveis de ambiente já estão completas para facilitar a instalação do projeto. No entanto, após o processo, essas variáveis não continuarão públicas.

### Variáveis do Backend:

- `DB_HOST`
- `DB_USER`
- `DB_PASS`
- `DB`
- `PORT`

### Variáveis do Frontend:

- `CLIENT_ID`
- `CLIENT_SECRET`

Essas variáveis fazem parte da Dev API do Spotify. Consulte a [documentação oficial](https://developer.spotify.com/documentation/web-api/).

## 💻 Funcionalidades

- Pesquisa de artistas disponíveis na Spotify API
- Interface responsiva e intuitiva
- Armazenamento de dados com PostgreSQL
- API dedicada para gerenciamento de contratações

## 🛠️ Construído com

- **React (Vite)** - Framework frontend
- **Laravel** - Framework backend
- **PostgreSQL** - Banco de dados
- **TailwindCSS** - Estilização
- **Spotify API** - Busca de artistas
