# 💖 Esdra & Maria Clara - Nossa História de Amor

Uma aplicação web moderna e acessível que conta a linda história de amor entre Esdra e Maria Clara, construída com tecnologias web de ponta e foco em performance, acessibilidade e experiência do usuário.

[![CI/CD Pipeline](https://github.com/ezrafchev/site-para-maria-clara/actions/workflows/deploy.yml/badge.svg)](https://github.com/ezrafchev/site-para-maria-clara/actions/workflows/deploy.yml)
[![Accessibility](https://img.shields.io/badge/Accessibility-100%25-success)](https://github.com/ezrafchev/site-para-maria-clara)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue)](https://github.com/ezrafchev/site-para-maria-clara)

## 🌟 Características

### ✨ Recursos Avançados
- **Progressive Web App (PWA)** com suporte offline
- **Acessibilidade AA** com 100% de conformidade
- **Design responsivo** e moderno inspirado no Apple Design System
- **Performance otimizada** com Lighthouse score ≥ 90
- **SEO estruturado** com dados JSON-LD
- **Integração Apple** com touch icons e web app capabilities

### 🎨 Funcionalidades
- **Galeria interativa** com upload de fotos
- **Calculadora do amor** personalizada
- **Contagem regressiva** para datas especiais
- **Player de música** integrado
- **Tema claro/escuro** com persistência
- **Animações suaves** com AOS (Animate On Scroll)
- **Navegação por touch** otimizada para mobile

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/ezrafchev/site-para-maria-clara.git

# Entre no diretório
cd site-para-maria-clara

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Ou usando o servidor Python (alternativo)
npm run serve
```

O site estará disponível em `http://localhost:8000`

### Build para Produção
```bash
# Gere o build otimizado
npm run build

# Preview do build
npm run preview
```

## 🧪 Testes

### Executar Todos os Testes
```bash
npm test
```

### Testes Específicos
```bash
# Testes unitários
npm run test:unit

# Testes de acessibilidade
npm run test:accessibility

# Testes E2E
npm run test:e2e

# Análise de performance com Lighthouse
npm run lighthouse
```

### Linting e Verificação de Tipos
```bash
# ESLint
npm run lint

# TypeScript check
npm run type-check
```

## 📱 PWA (Progressive Web App)

### Características PWA
- ✅ **Instalável** em dispositivos móveis e desktop
- ✅ **Funciona offline** com service worker
- ✅ **Fast loading** com cache inteligente
- ✅ **App-like experience** em tela cheia
- ✅ **Secure** (HTTPS requerido em produção)

### Instalação como App
1. Acesse o site no navegador
2. Procure pelo ícone "Instalar" na barra de endereços
3. Siga as instruções para adicionar à tela inicial

## 🍎 Integração Apple

### Recursos Apple
- **Apple Touch Icon** otimizado para diferentes tamanhos
- **Web App Capable** para experiência nativa no Safari
- **Status Bar Style** personalizado
- **Splash Screen** automática
- **Retina Display** support

### Apple Pay Integration (Opcional)
Para implementar Apple Pay, siga estas etapas:

1. **Merchant ID**: Registre-se no Apple Developer Program
2. **Domain Verification**: Configure domain association file
3. **Payment Processing**: Integre com gateway de pagamento
4. **Testing**: Use simulador para testes

```javascript
// Exemplo de integração Apple Pay (documentação)
if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
  // Implementar lógica de pagamento
  // Ver documentação completa no Apple Developer
}
```

### Sign in with Apple (Opcional)
1. **App ID Configuration** no Apple Developer
2. **Service ID** para web authentication
3. **Private Key** para JWT generation
4. **Implementation** seguindo OAuth 2.0 flow

## 🔧 Arquitetura Técnica

### Stack Tecnológico
- **Build Tool**: Vite 5.x
- **PWA**: vite-plugin-pwa
- **Testing**: Vitest + Playwright
- **Linting**: ESLint + TypeScript
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages

### Estrutura do Projeto
```
site-para-maria-clara/
├── public/                 # Arquivos estáticos
│   ├── manifest.json      # PWA manifest
│   ├── *.png              # Ícones PWA
│   └── browserconfig.xml  # Windows tiles
├── scripts/               # Scripts de automação
│   ├── accessibility-test.js
│   ├── lighthouse-test.js
│   └── create-pwa-icons.js
├── tests/                 # Testes automatizados
│   ├── unit.test.js       # Testes unitários
│   ├── e2e.spec.js        # Testes E2E
│   └── setup.js           # Configuração de testes
├── assets/                # Assets do projeto
│   ├── images/            # Imagens
│   └── audio/             # Arquivos de áudio
├── index.html             # Página principal
├── style.css              # Estilos principais
├── script.js              # JavaScript principal
├── package.json           # Dependências
├── vite.config.js         # Configuração Vite
└── playwright.config.js   # Configuração E2E
```

## 📊 Métricas de Qualidade

### Lighthouse Scores (Target: ≥90)
- 🎯 **Performance**: 90+
- 🎯 **Accessibility**: 100
- 🎯 **Best Practices**: 90+
- 🎯 **SEO**: 90+

### Testes
- ✅ **Unit Tests**: 7/7 passando
- ✅ **Accessibility**: 100% conformidade
- ✅ **E2E Tests**: Cobertura completa de funcionalidades
- ✅ **Build**: Zero erros

## 🚢 Deploy

### Deploy Automático (GitHub Pages)
O deploy é automático via GitHub Actions:

1. **Push para main** → Trigger workflow
2. **Tests & Build** → Verificação de qualidade
3. **Deploy** → GitHub Pages
4. **Verification** → Validação pós-deploy

### Verificação de Deploy
O sistema cria um arquivo `version.txt` com o SHA do commit para verificação:
```bash
curl https://ezrafchev.github.io/site-para-maria-clara/version.txt
```

### Deploy Manual
```bash
# Build do projeto
npm run build

# Deploy para GitHub Pages (se configurado)
npm run deploy
```

## 🔒 Segurança

### Cabeçalhos de Segurança
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### HTTPS
- Obrigatório em produção
- Certificado automático via GitHub Pages
- Redirecionamento HTTP → HTTPS

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Padrões de Código
- ESLint configurado
- Prettier para formatação
- Conventional Commits
- 100% de cobertura de testes para novas features

## 📝 Changelog

### v1.0.0 (2024)
- ✨ PWA completo com offline support
- ✨ Acessibilidade 100% (AA compliance)
- ✨ Integração Apple (touch icons, web app)
- ✨ Testing framework completo
- ✨ CI/CD automatizado
- ✨ Performance otimizada
- ✨ SEO estruturado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 💕 Sobre

Uma homenagem digital ao amor eterno entre Esdra e Maria Clara, construída com carinho e as melhores práticas de desenvolvimento web moderno.

---

**Feito com ❤️ por Esdra para Maria Clara**

[![Deploy Status](https://github.com/ezrafchev/site-para-maria-clara/actions/workflows/deploy.yml/badge.svg)](https://ezrafchev.github.io/site-para-maria-clara/)
