# Ficha OSR (extensão para Owlbear Rodeo)

Ficha editável de uso pessoal bem simples no estilo do DummySheet, com três recursos a mais:

1. **Imagem do personagem** no topo da ficha (endereço de imagem ou imagem do token selecionado).
2. **Cálculo de peso**: cada linha soma quantidade × peso, e a última linha mostra o peso total, com limite de carga opcional.
3. **Visão do narrador**: o narrador ganha a aba "Mesa" com as fichas de todos os jogadores, mesmo dos que estão desconectados (somente leitura).

## Instalar com "Add custom extension"

1. Ative a extensão na sala. Cada pessoa da mesa precisa ter a extensão ativa (o narrador também).


## Como usar a ficha

- Clique nos valores para editar.
- **Editar estrutura** permite renomear campos e seções, adicionar e remover linhas, mover seções, trocar a cor e criar seções de campos, de peso ou de texto.
- Clique na imagem para trocar. Cole o endereço de uma imagem ou selecione um token no mapa e use "Usar imagem do token selecionado".
- Na seção de peso, Enter cria uma nova linha. Aceita vírgula ou ponto nos números.
- **Backup e sincronização** mostra o espaço usado na sala e gera um texto com a ficha para guardar ou levar a outra sala.

## Onde as fichas ficam salvas

- A ficha de cada jogador é salva nos metadados da sala do Owlbear e também no navegador. Por isso o narrador a vê mesmo com o jogador desconectado, e o jogador a recupera em outro aparelho (a extensão oferece as fichas salvas com o mesmo nome de jogador).
- O Owlbear limita os metadados da sala a 16 kB, divididos entre todas as extensões. Cada ficha ocupa cerca de 1 a 3 kB. Se a sala encher, a ficha avisa que não foi salva na sala e continua salva no navegador.
- O Owlbear não apaga chaves dos metadados, só as esvazia. "Remover da sala" esvazia a ficha, e a chave vazia é reaproveitada na próxima ficha nova.
- A ficha do narrador fica só no navegador dele.
- Qualquer jogador com acesso técnico aos metadados da sala consegue ler as fichas dos outros. A tela só mostra a própria.

## Observações

- A extensão carrega o SDK do Owlbear Rodeo de `cdn.jsdelivr.net`. Se quiser fixar uma versão, edite `SDK_URL` em `app.js`.
- Os caminhos do `manifest.json` são relativos para funcionar em endereço com subpasta (GitHub Pages). Se o ícone ou a janela não carregarem, troque por endereços completos.

## Roadmap
- Criar mais alguns itens que conversam entre si. ex.: armaduras que ao checadas já somam na classe de armadura
- Tornar as seções "arrastáveis"
- criar áreas ancora com itens que recebem informação e se calculam sozinhos
