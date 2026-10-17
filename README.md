# DummySheet OSR

Versão modificada do [DummySheet](https://github.com/kurara-ara/dummy-sheet), de kurara ara, para Owlbear Rodeo.
Todo o comportamento original foi mantido (editar campos, seções, tema, exportar e importar JSON, abas do narrador).
O que foi acrescentado:

1. **Imagem do personagem** ao lado do título. Clique em "Add image" e cole o endereço de uma imagem (http ou https), ou selecione um token no mapa e use "Use selected token".
2. **Seção de peso**. Em Edit, use "Add Weight Section". Cada linha tem item, quantidade e peso de cada unidade; a última linha mostra o **peso total**. Também há limite de carga e unidade (kg, lb, slots), com aviso quando passa do limite. Aceita vírgula ou ponto nos números.
3. **Visão do narrador**: já existia no DummySheet (abas no topo) e agora mostra também a imagem e as seções de peso dos jogadores. Foi corrigido um erro que acontecia ao abrir a aba de um jogador que ainda não tinha publicado ficha.

## Por que tem tantos arquivos e uma etapa de build

O código-fonte usa Svelte, TypeScript e SCSS, que o navegador não executa diretamente. O Vite compila tudo em arquivos estáticos na pasta `dist/`, e é essa pasta que vai para a internet. Por isso o repositório guarda o código-fonte e o GitHub Actions faz o build a cada envio.

## Publicar no GitHub e instalar no Owlbear

1. Crie um repositório **público** com qualquer nome (por exemplo `dummysheet-osr`) e envie todos os arquivos desta pasta, inclusive a pasta oculta `.github`.
2. No repositório, abra **Settings → Pages** e em **Source** escolha **GitHub Actions**.
3. Abra a aba **Actions** e espere o fluxo "Deploy to GitHub Pages" terminar (alguns minutos). Se falhar, o erro aparece ali.
4. O endereço da extensão será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/manifest.json`. Abra no navegador para conferir que aparece um JSON. Se o repositório se chamar `SEU-USUARIO.github.io`, o endereço fica sem o nome do repositório.
5. No Owlbear Rodeo, abra a lista de extensões, escolha **Add custom extension**, cole esse endereço e confirme.
6. Ative a extensão na sala. O narrador e os jogadores precisam estar com ela ativa.

Durante o build, o fluxo do GitHub Actions ajusta os caminhos do `manifest.json` (`/icon.svg` e `/`) e a base do Vite ao nome do repositório. No computador (`npm run dev`) nada disso é alterado.

## Rodar no computador

```
npm install
npm run dev
```

## Observações

- Os textos da interface continuam em inglês, como no DummySheet.
- A ficha de cada jogador fica salva no navegador dele. O narrador vê a ficha dos jogadores que estão conectados (as fichas são enviadas pelos metadados do jogador, como no original).
- Uma seção de peso exportada e importada no DummySheet original aparece como uma seção comum, mostrando o peso de cada unidade.
- O projeto original não tem arquivo de licença. Antes de divulgar esta versão, vale pedir autorização à autora.
