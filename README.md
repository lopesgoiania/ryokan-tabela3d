# Ryokan Flamboyant — Tabela 3D

Visualização interativa do empreendimento, seleção de unidades e galeria de imagens. Projeto Vite com Three.js.

## Executar localmente

```sh
npm ci
npm run dev
```

## Publicar na Vercel pelo GitHub

1. Importe este repositório em **Vercel → Add New → Project**.
2. Use o preset **Vite**, a pasta raiz, o comando `npm run build` e a saída `dist`.
3. Clique em **Deploy**. Não são necessárias variáveis de ambiente.

A configuração está em `vercel.json`. Atualizações na branch de produção serão publicadas pela integração com o GitHub.

Instruções completas em [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md).

As imagens do site estão em `public/images`. Pastas de referências originais, dependências e arquivos temporários não fazem parte do repositório.
