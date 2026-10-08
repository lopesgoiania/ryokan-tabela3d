# Publicar o Ryokan 3D na Vercel

O projeto está configurado para publicação como site estático. Não precisa de banco de dados nem variáveis de ambiente. As imagens utilizadas estão em `public/images` e são incluídas automaticamente.

## Opção 1 — publicar pelo terminal

Abra o terminal nesta pasta e execute, um comando por vez:

```sh
npx vercel login
npx vercel
```

Entre na sua conta quando solicitado. Na configuração, confirme esta pasta como projeto, escolha sua conta/equipe e um nome como `ryokan-3d`. Aceite as configurações detectadas do Vite. O comando gera uma URL de prévia para revisar o site.

Quando estiver satisfeito com a prévia, publique a versão principal:

```sh
npx vercel --prod
```

Para futuras atualizações, execute novamente `npx vercel --prod` nesta mesma pasta.

## Opção 2 — conectar um repositório GitHub

Coloque o projeto em um repositório GitHub. Na Vercel, vá em **Add New → Project**, importe o repositório e confira:

| Campo | Valor |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | Pasta que contém `package.json` (raiz se o projeto estiver na raiz do repositório) |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | Nenhuma |

Clique em **Deploy**. A configuração também está salva em `vercel.json`. Com o repositório conectado, novos commits na branch de produção geram novas publicações automaticamente.

## Conferir antes de publicar

```sh
npm ci
npm run build
npm run preview
```

Abra o endereço que aparecer no terminal. Confira a navegação 3D, seleção das unidades, galeria e botão “Sobre o produto”. A visualização 3D depende de WebGL no navegador.

As pastas de fotos originais `BOOK-EXTRAIDO` e `FOTOS FLAMBOYANT` ficam fora do envio pelo terminal; as versões usadas pelo site já estão em `public`. Não remova `public`, `environment.js`, `src.js`, `style.css` ou `index.html`.

## Domínio próprio

Depois da publicação, em **Project → Settings → Domains**, adicione o domínio ou subdomínio desejado e aplique os registros DNS indicados pela Vercel.

Documentação: [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite) e [publicação pelo terminal](https://vercel.com/docs/cli/deploying-from-cli).
