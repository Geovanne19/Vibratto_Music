# 🎵 Vibratto – Loja de Instrumentos Musicais

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-61DAFB?logo=react)
![Rails](https://img.shields.io/badge/backend-Ruby%20on%20Rails-D30001?logo=rubyonrails)
![License](https://img.shields.io/badge/license-MIT-blue)

**Vibratto** é um projeto fictício de e-commerce musical, desenvolvido com **React + TypeScript** no frontend e **Ruby on Rails** no backend.  
O objetivo é simular uma loja de instrumentos musicais, oferecendo listagem de produtos, gerenciamento por categorias e integração com API.

---

##  Tecnologias utilizadas

**Frontend:**
- React
- TypeScript
- Axios
- TailwindCSS

**Backend:**
- Ruby on Rails
- PostgreSQL
- Devise (para autenticação)
- Stripe (para pagamentos)

---

##  Funcionalidades

- Listagem de produtos com nome, preço, imagem, descrição e categoria.
- Organização de produtos por categoria.
- Integração entre frontend e backend via API RESTful.
- Estrutura pronta para carrinho de compras e autenticação de usuários.
- Sistema de pagamentos implementado 

---

##  Como rodar o projeto

### Backend (Rails)
```bash
# Clone o repositório
git clone https://github.com/Geovanne19/Vibratto_Music.git

# Entre na pasta do backend
cd vibratto/backend

# Instale as dependências
bundle install

# Crie e migre o banco de dados
rails db:create db:migrate db:seed

# Inicie o servidor
rails server
```
### Frontend (React)

```bash
# Entre na pasta do frontend
cd vibratto/frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
