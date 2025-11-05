# PokeMania

Uma Pokédex digital interativa desenvolvida com HTML5, CSS3 e JavaScript, onde você pode visualizar seus Pokémon favoritos, explorar suas informações e montar seu próprio deck de batalha!

## Sobre o Projeto

PokeMania é uma aplicação web que consome a PokeAPI
 para exibir dados completos sobre cada Pokémon — incluindo nome, tipos, habilidades, atributos e imagens oficiais.
Além disso, o usuário pode buscar Pokémon por nome ou ID, navegar entre eles e adicioná-los ao seu deck pessoal, que é salvo automaticamente no navegador via localStorage.

## Funcionalidades

- Busca inteligente – encontre qualquer Pokémon pelo nome ou número da Pokédex.
- Visualização detalhada – veja estatísticas, tipos e habilidades de cada Pokémon.
- Deck personalizado – adicione seus Pokémon preferidos e monte combinações estratégicas.
- Armazenamento local – seu deck é salvo automaticamente no navegador.
- Design responsivo e interativo – com efeitos visuais e transições suaves.

## Demonstração

🔗 (Adicione aqui o link do deploy — por exemplo, GitHub Pages ou Vercel)
Exemplo:
 Acesse o PokeMania Online

Tecnologias Utilizadas
Tecnologia	Função
HTML5	Estrutura da aplicação
CSS3	Estilização e responsividade
JavaScript (ES6+)	Lógica, manipulação do DOM e consumo da API
PokeAPI	Fonte de dados sobre os Pokémon
LocalStorage	Armazenamento do deck do usuário
 Como Executar o Projeto

Clone este repositório

git clone https://github.com/seuusuario/pokemania.git


Acesse a pasta do projeto

cd pokemania


Abra o arquivo index.html diretamente no navegador
(ou utilize uma extensão como Live Server no VS Code para melhor experiência)

📸 Prévia do Projeto

(Adicione aqui screenshots ou GIFs demonstrando o app em ação)

## Exemplo:


### Estrutura do Projeto
PokeMania/
│
├── assets/
│   └── images/                # Imagens e ícones
│
├── index.html                 # Estrutura principal
├── style.css                  # Estilos e layout
├── script.js                  # Lógica da aplicação
└── README.md                  # Este arquivo :)

 Detalhes Técnicos

O projeto utiliza event listeners para navegação e busca.

O deck é renderizado dinamicamente no DOM.

Todos os dados são obtidos da PokeAPI, com tratamento de erros e exibição de mensagens amigáveis.

A função renderDeck() atualiza automaticamente o conteúdo visual ao adicionar ou remover Pokémon.

 ### Autor:

Caio Rodrigues

### Licença:

Este projeto está sob a licença MIT.
Sinta-se à vontade para utilizá-lo e aprimorá-lo!