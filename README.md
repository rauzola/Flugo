# 🚀 Flugo - Sistema de Gestão de Colaboradores

## 📋 Descrição do Projeto

**Flugo** é um sistema completo de gestão de colaboradores desenvolvido como solução para o Desafio Frontend da empresa Flugo. O projeto implementa um formulário multi-step para cadastro de funcionários, com interface visual moderna e responsiva, seguindo as especificações do protótipo fornecido.

### 🎯 Objetivos do Desafio
- ✅ Criar formulário multi-step para cadastro de funcionários
- ✅ Interface visual conforme protótipo Figma
- ✅ ReactJS com TypeScript
- ✅ Estilização com Material UI
- ✅ Persistência via Firebase
- ✅ Validações e feedback entre etapas
- ✅ Hospedagem em servidor vercel
- ✅ Repositório público no GitHub

## ✨ Funcionalidades Implementadas

### 🔐 Cadastro Multi-Step
- **Step 1 - Informações Básicas**: Nome completo, e-mail e status de ativação
- **Step 2 - Informações Profissionais**: Seleção de departamento
- **Validações**: Campos obrigatórios, formato de e-mail, comprimento mínimo do nome
- **Progress Bar**: Indicador visual do progresso (0% → 50% → 100%)

### 📊 Gestão de Colaboradores
- **Listagem**: Tabela responsiva com todos os colaboradores
- **Ordenação**: Por nome, e-mail, departamento, status e data de criação
- **Edição**: Drawer lateral para editar dados existentes
- **Status**: Indicadores visuais para colaboradores ativos/inativos

### 🎨 Interface Moderna
- **Design Responsivo**: Adaptável a desktop, tablet e mobile
- **Material UI**: Componentes modernos e acessíveis
- **Tema Customizado**: Cores e estilos alinhados com a identidade visual
- **Navegação Intuitiva**: Sidebar, breadcrumbs e navegação clara

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Next.js 15** - Framework React com App Router
- **Material UI v7** - Biblioteca de componentes React

### Backend & Banco de Dados
- **Firebase Realtime Database** - Banco de dados em tempo real
- **Firebase SDK** - Integração oficial do Firebase

### Estilização & UX
- **Material UI Icons** - Ícones consistentes
- **Responsive Design** - Design adaptável a diferentes telas
- **Custom Hooks** - Lógica reutilizável e organizada

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Yarn** - Gerenciador de pacotes
- **Git** - Controle de versão

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- Yarn ou npm
- Conta Firebase (para banco de dados)

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/flugo.git
cd flugo
```

### 2. Instale as Dependências
```bash
yarn install
# ou
npm install
```

### 3. Configure o Firebase
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://flugo-desafio-raul-default-rtdb.firebaseio.com
```

### 4. Configure as Regras do Firebase
No Firebase Console, configure as regras do Realtime Database:
```json
{
  "rules": {
    "colaboradores": {
      ".read": true,
      ".write": true,
      ".indexOn": "dataCriacao"
    }
  }
}
```

### 5. Execute o Projeto
```bash
yarn dev
# ou
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Como Usar o Sistema

### 🆕 Cadastrar Novo Colaborador
1. **Acesse a página inicial** - Lista de colaboradores
2. **Clique em "Novo Colaborador"** - Botão verde no topo
3. **Step 1 - Informações Básicas**:
   - Digite o nome completo (mínimo 3 letras)
   - Insira um e-mail válido
   - Escolha se ativa ao criar
4. **Clique em "Próximo"** - Validações são aplicadas
5. **Step 2 - Informações Profissionais**:
   - Selecione o departamento
6. **Clique em "Concluir"** - Colaborador é salvo no Firebase

### ✏️ Editar Colaborador Existente
1. **Na tabela principal** - Clique em qualquer linha
2. **Drawer lateral abre** - Com dados atuais do colaborador
3. **Edite os campos** - Nome, e-mail, departamento, status
4. **Clique em "Salvar"** - Alterações são persistidas
5. **Feedback visual** - Mensagem de sucesso/erro

### 🔍 Gerenciar Lista de Colaboradores
- **Ordenação**: Clique nos cabeçalhos da tabela para ordenar
- **Filtros**: Use os ícones de ordenação para diferentes critérios
- **Responsividade**: Tabela se adapta a diferentes tamanhos de tela

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Diretórios
```
src/
├── app/                    # Páginas Next.js (App Router)
│   ├── layout.tsx         # Layout principal da aplicação
│   ├── page.tsx           # Página inicial (lista de colaboradores)
│   └── cadcolaborador/    # Página de cadastro multi-step
│       └── page.tsx
├── components/             # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho da aplicação
│   ├── Sidebar.tsx        # Barra lateral de navegação
│   ├── EmployeeTable.tsx  # Tabela de colaboradores
│   ├── Breadcrumb.tsx     # Navegação breadcrumb
│   ├── ProgressBar.tsx    # Barra de progresso
│   ├── StepperVertical.tsx # Stepper vertical
│   ├── FormField.tsx      # Campo de formulário customizado
│   ├── Switch.tsx         # Switch customizado
│   └── Button.tsx         # Botão customizado
├── lib/                    # Serviços e configurações
│   ├── firebase.ts        # Configuração do Firebase
│   └── colaboradores.ts   # Serviço de CRUD de colaboradores
├── types/                  # Tipos TypeScript compartilhados
│   └── cadastro.ts        # Interfaces e constantes
└── theme/                  # Configurações de tema
    └── theme.ts           # Tema customizado do Material UI
```

### 🔧 Componentes Principais

#### **EmployeeTable.tsx**
- Tabela responsiva com ordenação
- Drawer de edição integrado
- Estados de loading e erro
- Feedback visual com Snackbar

#### **Cadastro Multi-Step**
- Validação em tempo real
- Navegação entre steps
- Progress bar visual
- Integração com Firebase

#### **Sidebar.tsx**
- Navegação principal
- Design responsivo
- Logo e menu de navegação

## 🎨 Design System

### 🎯 Paleta de Cores
- **Primária**: `#22C55E` (Verde)
- **Secundária**: `#637381` (Cinza)
- **Texto**: `#212B36` (Preto)
- **Background**: `#F4F6F8` (Cinza claro)
- **Bordas**: `rgba(145,158,171,0.20)` (Cinza transparente)

### 📱 Breakpoints Responsivos
- **Mobile**: < 600px
- **Tablet**: < 960px  
- **Desktop**: ≥ 960px

### 🧩 Componentes Material UI Customizados
- **FormField**: Campo de formulário com validação visual
- **Button**: Botões com cores e estilos personalizados
- **StepperVertical**: Stepper vertical customizado
- **ProgressBar**: Barra de progresso com cores personalizadas

## 🔥 Integração Firebase

### 📊 Realtime Database
- **Estrutura**: `/colaboradores/{id}`
- **Campos**: nome, email, departamento, ativo, dataCriacao
- **Operações**: CREATE, READ, UPDATE
- **Ordenação**: Local por data de criação

### 🔐 Segurança
- **Regras**: Leitura e escrita públicas para desenvolvimento
- **Validação**: Cliente e servidor
- **Tratamento de Erros**: Feedback visual para o usuário

## 🚀 Deploy e Hospedagem

### Vercel (Recomendado)
1. **Conecte o repositório** ao Vercel
2. **Configure as variáveis de ambiente** no dashboard
3. **Deploy automático** a cada push para main

### Outras Opções
- **Netlify**: Similar ao Vercel
- **Heroku**: Para aplicações mais complexas
- **Firebase Hosting**: Integração nativa com Firebase

## 🧪 Testes e Qualidade

### ✅ Funcionalidades Testadas
- Cadastro multi-step com validações
- Edição de colaboradores existentes
- Ordenação e filtros da tabela
- Responsividade em diferentes dispositivos
- Integração com Firebase
- Tratamento de erros

### 🔍 Linting e Formatação
- **ESLint**: Regras configuradas para TypeScript
- **Prettier**: Formatação automática de código
- **TypeScript**: Verificação de tipos em tempo de compilação

## 📈 Melhorias Futuras

### 🚀 Funcionalidades Planejadas
- [ ] **Autenticação**: Login/logout de usuários
- [ ] **Filtros Avançados**: Busca por texto, filtros múltiplos
- [ ] **Exportação**: PDF, Excel dos dados
- [ ] **Dashboard**: Gráficos e estatísticas
- [ ] **Notificações**: Sistema de alertas em tempo real
- [ ] **Histórico**: Log de alterações nos colaboradores

### 🎨 Melhorias de UX
- [ ] **Drag & Drop**: Reordenação de colaboradores
- [ ] **Bulk Actions**: Ações em lote
- [ ] **Keyboard Shortcuts**: Atalhos de teclado
- [ ] **Dark Mode**: Tema escuro

## 🤝 Contribuição

### 🐛 Reportando Bugs
- Use as **Issues** do GitHub
- Descreva o problema detalhadamente
- Inclua passos para reproduzir
- Adicione screenshots se relevante

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Raul Sigoli** - [GitHub](https://github.com/rauzola) - [LinkedIn](https://www.linkedin.com/in/raul-sigoli-137bb4173/)

## 🙏 Agradecimentos

- **Flugo** pela oportunidade do desafio

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/rauzola/flugo/issues)
- **Email**: raul_sigoli@hotmail.com
- **LinkedIn**: [Seu Perfil](https://www.linkedin.com/in/raul-sigoli-137bb4173/)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**
