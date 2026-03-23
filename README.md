# RB Service — Portfolio & Landing Page

> **Obras Sem Pesadelos** · Hudson Ribeiro · Florianópolis, SC

Landing page pessoal de Hudson Ribeiro — fundador da RB Service, referência em reformas de alto padrão na Grande Florianópolis e desenvolvedor de sistemas PHP/Python.

---

## Pré-visualização

| Seção | Descrição |
|---|---|
| **Hero** | Título cinematográfico com imagem de fundo, stats animados e CTAs |
| **Marquee** | Strip infinito com todos os serviços |
| **Sobre** | Dual identity: construção civil + desenvolvimento de sistemas |
| **Portfólio** | Carrossel CSS-only com pause no hover — 6 projetos reais |
| **Serviços** | Grid de 6 cards com linha coral deslizante |
| **Terminal** | Bloco Python mostrando a filosofia da RB Service em código |
| **Formulário** | Multi-step 3 etapas com upload de fotos → abre WhatsApp pré-preenchido |
| **Footer** | Links sociais + assinatura |

---

## Estrutura do Projeto

```
rbservice/
├── index.html          # Estrutura semântica principal
├── css/
│   └── style.css       # Todos os estilos (dark luxury theme)
├── js/
│   └── main.js         # Cursor, menu, reveal, formulário, carrossel
├── assets/             # Pasta para imagens locais (opcional)
│   └── .gitkeep
└── README.md
```

---

## Tecnologias

- **HTML5** semântico com atributos ARIA
- **CSS3** puro — variáveis, grid, keyframes, `backdrop-filter`
- **JavaScript** vanilla — sem frameworks, sem dependências locais
- **Font Awesome 6.5** via CDN (ícones)
- **Google Fonts** — Bebas Neue · DM Sans · Geist Mono

> ⚡ Zero dependências locais. Funciona offline após o primeiro carregamento do CDN.

---

## Publicar no GitHub Pages

### 1. Crie o repositório

```bash
# No terminal, dentro da pasta do projeto
git init
git add .
git commit -m "feat: landing page RB Service — Hudson Ribeiro"
```

### 2. Suba para o GitHub

```bash
# Substitua SEU_USUARIO pelo seu login do GitHub
git remote add origin https://github.com/SEU_USUARIO/rbservice.git
git branch -M main
git push -u origin main
```

### 3. Ative o GitHub Pages

1. Acesse o repositório no GitHub
2. Vá em **Settings → Pages**
3. Em **Source**, selecione `Deploy from a branch`
4. Em **Branch**, selecione `main` e pasta `/ (root)`
5. Clique em **Save**

Após ~2 minutos, o site estará disponível em:

```
https://SEU_USUARIO.github.io/rbservice/
```

---

## Domínio Personalizado (opcional)

Para usar `hudsonribeiro.com.br` ou similar:

1. No seu provedor de DNS, aponte os registros:
   ```
   A     185.199.108.153
   A     185.199.109.153
   A     185.199.110.153
   A     185.199.111.153
   CNAME www → SEU_USUARIO.github.io
   ```
2. No GitHub Pages, informe o domínio em **Custom domain**
3. Marque **Enforce HTTPS**
4. Crie o arquivo `CNAME` na raiz do projeto:
   ```
   hudsonribeiro.com.br
   ```

---

## Personalização

### Alterar número do WhatsApp

Em `index.html`, substitua todas as ocorrências de `5548984927764` pelo número no formato `55DDD9XXXXXXXX`:

```html
<!-- Busque por: -->
href="https://wa.me/5548984927764
<!-- Substitua pelo seu número -->
href="https://wa.me/5548SEUNUMERO
```

Em `js/main.js`, linha da função `submitBtn`:
```js
window.open('https://wa.me/5548984927764?text=' + msg, ...);
// → window.open('https://wa.me/5548SEUNUMERO?text=' + msg, ...);
```

### Alterar projetos do carrossel

No `index.html`, localize a seção `#portfolio` e edite os `<article class="c-card">`:

```html
<article class="c-card">
  <img src="URL_DA_IMAGEM" alt="Descrição do projeto">
  <div class="c-card-body">
    <div class="c-card-tag">Tipo de serviço</div>
    <div class="c-card-title">Nome do Projeto</div>
    <div class="c-card-meta">Descrição curta — 000m²</div>
  </div>
</article>
```

> **Importante:** Duplique todos os cards no segundo bloco (comentado como `Set 2`) para manter o loop contínuo do carrossel.

### Alterar paleta de cores

Em `css/style.css`, edite as variáveis no `:root`:

```css
:root {
  --coral: #FF5C3A;  /* Acento principal (vermelho-coral) */
  --lime:  #C8F47B;  /* Acento código (verde-lima) */
  --gold:  #FDD31E;  /* Logo e brand (amarelo) */
  --bg:    #080809;  /* Fundo mais escuro */
  --bg2:   #0e0e10;  /* Fundo secundário */
}
```

### Alterar velocidade do carrossel

Em `css/style.css`, localize:
```css
animation: carousel-scroll 36s linear infinite;
```
Diminua o valor (ex: `24s`) para mais rápido, aumente (ex: `48s`) para mais devagar.

### Adicionar/remover serviços

No `index.html`, seção `#services`, duplique ou remova um `.srv-card`:

```html
<div class="srv-card reveal">
  <span class="srv-num">07</span>
  <div class="srv-icon"><i class="fas fa-ICONE"></i></div>
  <h3 class="srv-title">NOME DO SERVIÇO</h3>
  <p class="srv-desc">Descrição curta do serviço oferecido.</p>
</div>
```

Ícones disponíveis em [fontawesome.com/icons](https://fontawesome.com/icons).

---

## SEO

Edite as metatags no `<head>` do `index.html`:

```html
<meta name="description" content="SUA DESCRIÇÃO AQUI">
<meta property="og:title"       content="TÍTULO DA PÁGINA">
<meta property="og:description" content="DESCRIÇÃO PARA REDES SOCIAIS">
<meta property="og:url"         content="https://SEU_DOMINIO.com.br">
```

---

## Acessibilidade

A página segue as diretrizes WCAG 2.1 nível AA:

- Atributos `aria-label` e `role` em elementos interativos
- Navegação por teclado completa (Tab, Enter, Escape)
- `prefers-reduced-motion` — todas as animações são desativadas para usuários que preferem
- `prefers-color-scheme` — preparado para suporte futuro a tema claro
- Cursor customizado desativado automaticamente em dispositivos touch (`hover: none`)
- Imagens duplicadas no carrossel com `aria-hidden="true"` e `alt=""`

---

## Performance

| Métrica | Estratégia |
|---|---|
| Imagens | `loading="lazy"` em todas as imagens do carrossel |
| Fontes | `rel="preconnect"` para Google Fonts |
| CSS | Arquivo único, sem `@import` |
| JS | Vanilla, sem bundler, executa após HTML |
| Animações | `will-change` apenas em elementos críticos |

---

## Contato

| Canal | Endereço |
|---|---|
| WhatsApp | [(48) 98492-7764](https://wa.me/5548984927764) |
| E-mail | rbservics@gmail.com |
| Instagram | [@rbservics](https://www.instagram.com/rbservics/) |
| Site original | [rbservice.com.br](https://rbservice.com.br) |
| Localização | Grande Florianópolis, SC |

---

© 2026 Hudson Ribeiro — RB Service. Todos os direitos reservados.
