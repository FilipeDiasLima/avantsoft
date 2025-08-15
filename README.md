# 🧸 ToyStore - Sistema de Gestão de Vendas

Sistema completo de gestão de vendas e clientes desenvolvido em monorepo com backend em Express.js e frontend em Next.js.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O ToyStore é um sistema de gestão empresarial focado em vendas e relacionamento com clientes. O projeto oferece um dashboard completo com estatísticas, gráficos de vendas e gerenciamento de clientes, desenvolvido com as melhores práticas de desenvolvimento moderno.

### ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Sistema seguro de login e registro
- 👥 **Gestão de Clientes** - CRUD completo de clientes
- 💰 **Controle de Vendas** - Registro e acompanhamento de vendas
- 📊 **Dashboard Analítico** - Gráficos e estatísticas em tempo real
- 📱 **Design Responsivo** - Interface adaptável para todos os dispositivos
- 🎨 **UI Moderna** - Components baseados em Radix UI e Tailwind CSS

## 🚀 Tecnologias

### Backend (toystore-api)

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **Zod** - Validação de schemas

### Frontend (toystore)

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **React Query** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
avantsoft/
├── toystore/                 # Frontend Next.js
│   ├── src/
│   │   ├── app/             # App Router do Next.js
│   │   │   ├── dashboard/   # Páginas do dashboard
│   │   │   ├── register/    # Página de registro
│   │   │   └── components/  # Componentes específicos de páginas
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   └── ui/         # Componentes de UI (Radix)
│   │   ├── contexts/        # Contextos React
│   │   ├── hooks/          # Custom hooks
│   │   ├── interface/      # Tipos TypeScript
│   │   ├── service/        # Serviços de API
│   │   └── utils/          # Utilitários
│   └── public/             # Arquivos estáticos
│
├── toystore-api/           # Backend Express.js
│   ├── src/
│   │   ├── application/    # Camada de aplicação
│   │   │   ├── factories/  # Factories para injeção de dependência
│   │   │   ├── repositories/ # Interfaces de repositórios
│   │   │   └── services/   # Serviços de negócio
│   │   ├── common/         # Código compartilhado
│   │   └── infra/         # Infraestrutura
│   │       ├── controllers/ # Controllers HTTP
│   │       ├── database/   # Configuração do banco
│   │       └── routes/     # Definição de rotas
│   └── prisma/            # Schema e migrações do banco
│
└── README.md              # Este arquivo
```

## ⚙️ Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/FilipeDiasLima/avantsoft.git
cd avantsoft
```

### 2. Configurar Backend

```bash
cd toystore-api

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma migrate dev

# Iniciar servidor de desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### 3. Configurar Frontend

```bash
cd ../toystore

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3001`

## 🎮 Como Usar

1. **Acesse a aplicação** em `http://localhost:3001`
2. **Registre-se** ou faça login com suas credenciais
3. **Dashboard** - Visualize estatísticas e gráficos de vendas
4. **Clientes** - Gerencie sua base de clientes
5. **Vendas** - Registre e acompanhe vendas

## 🔗 API Endpoints

### Autenticação

```
POST /auth          # Login
POST /auth/register # Registro
GET  /auth/me       # Dados do usuário logado
```

### Clientes

```
GET    /clients           # Listar clientes
POST   /clients           # Criar cliente
GET    /clients/:id       # Buscar cliente por ID
PUT    /clients/:id       # Atualizar cliente
DELETE /clients/:id       # Deletar cliente
```

### Vendas

```
GET    /sales             # Listar vendas
POST   /sales             # Criar venda
GET    /sales/stats       # Estatísticas gerais
GET    /sales/highlights  # Destaques
GET    /sales/statistics  # Dados para gráficos
```

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**:

- **Separação de responsabilidades** entre camadas
- **Injeção de dependências** via factories
- **Interfaces** para abstrair implementações
- **Validação** rigorosa de dados de entrada
- **Autenticação** baseada em JWT
- **Tratamento de erros** centralizado

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ por [Filipe Dias Lima](https://github.com/FilipeDiasLima)
