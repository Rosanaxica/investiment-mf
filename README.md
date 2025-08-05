# Microfrontend de Investimentos

Este é o microfrontend de investimentos que funciona como uma aplicação independente dentro da arquitetura Multi-Zones.

## 🎨 Design System

### Shadcn/ui
O projeto utiliza **Shadcn/ui** para componentes acessíveis e consistentes:

- **Componentes**: Biblioteca de componentes reutilizáveis
- **Acessibilidade**: Componentes acessíveis por padrão
- **Customização**: Fácil customização com Tailwind CSS
- **Consistência**: Design system unificado

### Componentes Disponíveis

- **Button**: Botões com variantes (default, outline, secondary, ghost, link)
- **Card**: Cards com header, content, footer
- **Badge**: Badges para status e labels
- **Input**: Campos de entrada (quando necessário)
- **Dialog**: Modais e diálogos (quando necessário)

### Configuração Shadcn/ui

```javascript
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

## 🚀 Como Executar

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3001

### Build

```bash
npm run build
npm start
```

## 📱 Funcionalidades

### Interface Principal
- **Header**: Título e botões de ação com Shadcn/ui
- **Stats Cards**: 4 cards com estatísticas principais
- **Filtros**: Sistema de busca e filtros
- **Lista de Investimentos**: Tabela com detalhes dos investimentos

### Componentes Shadcn/ui
- **Button**: Botões com variantes e tamanhos
- **Card**: Cards responsivos com hover effects
- **Badge**: Status indicators com cores diferentes
- **Layout**: Container responsivo

## 🎨 Estilos

### Sistema de Cores
- **Primary**: hsl(var(--primary)) - Verde principal
- **Secondary**: hsl(var(--secondary)) - Cinza secundário
- **Muted**: hsl(var(--muted)) - Texto secundário
- **Border**: hsl(var(--border)) - Bordas
- **Background**: hsl(var(--background)) - Fundo

### Variáveis CSS
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## 🔧 Configuração

### Dependências
```json
{
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.510.0",
    "tailwind-merge": "^3.3.0",
    "tailwindcss-animate": "^1.0.7",
    "clsx": "^2.1.1",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4"
  }
}
```

### Arquivos de Configuração
- `tailwind.config.ts` - Configuração do Tailwind + Shadcn
- `postcss.config.js` - Configuração do PostCSS
- `globals.css` - Estilos globais e variáveis CSS
- `src/lib/utils.ts` - Utilitários (cn function)

### Componentes Shadcn
- `src/components/ui/button.tsx` - Componente Button
- `src/components/ui/card.tsx` - Componente Card
- `src/components/ui/badge.tsx` - Componente Badge

## 📊 Estrutura de Dados

### Interface Investment
```typescript
interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  return: number;
  date: string;
  status: 'active' | 'pending' | 'completed';
}
```

## 🎯 Integração

### Multi-Zones
Este microfrontend é carregado pelo shell principal através de:

- **Iframe**: Carregamento seguro
- **Fallback**: Componente local caso indisponível
- **Headers**: Configurado para permitir iframe

### URLs
- **Microfrontend**: http://localhost:3001
- **Shell**: http://localhost:3000/investments

## 🔄 Redux State Management

### Implementação Redux

O microfrontend agora utiliza **Redux Toolkit** para gestão de estado centralizada:

#### ✅ **Vantagens do Redux**

- **Estado Centralizado**: Gestão unificada de dados
- **Previsibilidade**: Fluxo de dados unidirecional
- **DevTools**: Ferramentas de debugging avançadas
- **Escalabilidade**: Fácil adição de novos slices
- **Performance**: Otimizações automáticas

#### 📁 **Estrutura Redux**

```
src/lib/
├── store.ts              # Configuração da store
├── hooks.ts              # Hooks personalizados
└── slices/
    ├── investmentsSlice.ts    # Estado dos investimentos
    └── filtersSlice.ts        # Estado dos filtros
```

#### 🔄 **Slices Implementados**

**Investments Slice:**
```typescript
addInvestment(investment)
removeInvestment(id)
updateInvestment(investment)
setLoading(boolean)
setError(string)
clearError()
```

**Filters Slice:**
```typescript
setSearchTerm(string)
setSelectedType(string)
setSortBy('name' | 'amount' | 'return' | 'date')
setSortOrder('asc' | 'desc')
clearFilters()
```

#### 🎯 **Funcionalidades Redux**

- **CRUD Completo**: Adicionar, editar, remover investimentos
- **Filtros Avançados**: Busca por texto e tipo
- **Ordenação**: Múltiplos critérios de ordenação
- **Estado de Loading**: Indicadores de carregamento
- **Tratamento de Erros**: Gestão centralizada de erros

#### 📊 **Uso dos Hooks**

```typescript
const { investments, loading, error } = useAppSelector(state => state.investments);
const { searchTerm, selectedType } = useAppSelector(state => state.filters);

const dispatch = useAppDispatch();
dispatch(addInvestment(newInvestment));
dispatch(setSearchTerm('Tesouro'));
```

## 🔄 Server-Side Rendering (SSR)

### Implementação SSR

O microfrontend agora utiliza **Server-Side Rendering** para melhor performance e SEO:

#### ✅ **Vantagens do SSR**

- **Performance**: Carregamento mais rápido
- **SEO**: Melhor indexação pelos motores de busca
- **Acessibilidade**: Conteúdo disponível sem JavaScript
- **UX**: Menos loading states visíveis

#### 📁 **Arquivos SSR**

- `src/app/page.tsx` - Página principal com dados do servidor
- `src/app/api/investments/route.ts` - API para buscar dados
- `src/app/loading.tsx` - Componente de loading
- `src/app/error.tsx` - Componente de tratamento de erro

#### 🔄 **Fluxo de Dados**

```typescript
async function getInvestmentsData(): Promise<Investment[]> {
  const response = await fetch('/api/investments');
  return response.json();
}

export default async function InvestmentsPage() {
  const investments = await getInvestmentsData();
  return <div>{/* Renderização com dados */}</div>;
}
```

#### 🎯 **Funcionalidades SSR**

- **Dados Reais**: API route com dados mockados
- **Error Handling**: Tratamento de erros com fallback
- **Loading States**: Skeleton loading durante carregamento
- **Cache**: Configuração de cache por ambiente

#### 📊 **API Route**

```typescript
export async function GET() {
  return NextResponse.json({
    success: true,
    data: investments,
    timestamp: new Date().toISOString()
  });
}
```

## 🔄 Shadcn/ui

### Vantagens 

✅ **Componentes Acessíveis**: Todos os componentes seguem padrões de acessibilidade
✅ **Consistência**: Design system unificado
✅ **Reutilização**: Componentes reutilizáveis
✅ **Customização**: Fácil customização com Tailwind
✅ **Manutenibilidade**: Código mais limpo e organizado

### Diferenças Principais entre DS

| Aspecto | Tailwind | Shadcn/ui |
|---------|----------|-----------|
| **Componentes** | Classes CSS | Componentes React |
| **Acessibilidade** | Manual | Automática |
| **Consistência** | Manual | Automática |
| **Customização** | Direta | Via props |
| **Manutenção** | Mais trabalho | Menos trabalho |

## 📝 Licença

Este projeto é parte do Tech Challenge e está sob licença MIT.

---

**Status**: ✅ Funcionando com Shadcn/ui + SSR + Redux
**Versão**: 3.0.0
**Última atualização**: Dezembro 2024 