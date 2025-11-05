
    /*VARIÁVEIS PARA MANIPULAR ELEMENTOS*/
const header = document.getElementById("header");
const nameEl = document.getElementById("pokemon-nome");
const idEl = document.getElementById("pokemon-id");
const imgEl = document.getElementById("pokemon-imagem");
const typesEl = document.getElementById("pokemon-types");
const inputEl = document.getElementById("input-busca");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const addDeckBtn = document.getElementById("add-deck-btn");
const deckGrid = document.getElementById("deck-grid");

let currentId = 1;
let currentPokemon = null;
let deck = JSON.parse(localStorage.getItem('pokemonDeck')) || [];

        /*EFEITO NO HEADER AO SCROLLAR*/
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50){
            header.classList.add('scrolled');
        }else{
            header.classList.remove('scrolled');
        }
    });

    async function fetchPokemon(pokemon) {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            if(!response.ok) throw new Error("Pokemon não encontrado");
            const data = await response.json();
            currentPokemon = data;
            showPokemon(data);
        } catch (error) {
            nameEl.textContent = "Pokemon não encontrado";
            imgEl.src = "assets/images/error-404.webp";
            idEl.textContent = "-";
            typesEl.innerHTML = "<span style='color: #ff6b6b;'> Não encontrado</span>";
            currentPokemon = null;
        }
    }

        /*EXIBE O POKEMON*/
    function showPokemon(pokemon){
        nameEl.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        idEl.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
        imgEl.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

        typesEl.innerHTML = pokemon.types
                .map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`)
                .join("");
        currentId = pokemon.id;
    }

        /*CONTROLES*/
    prevBtn.addEventListener('click', () => {
        if(currentId > 1){
            currentId--;
            fetchPokemon(currentId);
        }
    });

    nextBtn.addEventListener('click', () => {
        currentId++;
        fetchPokemon(currentId);
    });

        /*PESQUISA*/
    inputEl.addEventListener('keyup', (e) => {
        if (e.key === "Enter" && inputEl.value.trim() !== ""){
            fetchPokemon(inputEl.value.toLowerCase().trim());
            inputEl.value = "";
        }
    });

        /*CRIAÇÃO DO DECK*/
    addDeckBtn.addEventListener('click', async () => {
        
        /*VERIFICAÇÕES*/
        if(!currentPokemon){
            alert("Nenhum Pokemon carregado.")
            return;
        }

        if(deck.some(p => p.id === currentPokemon.id)){
            alert("Esse Pokemon já foi adicionado ao deck.")
            return;
        }

        /*BUSCA INFOS ADICIONAIS*/
        try{
            const speciesResponse = await fetch(currentPokemon.species.url);
            const speciesData = await speciesResponse.json();

            const flavorText = speciesData.flavor_text_entries.find(
                entry => entry.language.name === "pt"
            );

            const pokemonData = {
                id: currentPokemon.id,
                name: currentPokemon.name,
                image: currentPokemon.sprites.other["official-artwork"].front_default || currentPokemon.sprites.front_default,
                types: currentPokemon.types.map(t => t.type.name),
                stats: currentPokemon.stats.map(s => ({
                    name: s.stat.name,
                    value: s.base_stat
                })),
                abilities: currentPokemon.abilities.map(a => a.ability.name),
                description: flavorText ? flavorText.flavor_text.replace(/\f/g, ' ') : "Sem descrição disponível"
            };

            deck.push(pokemonData);
            localStorage.setItem('pokemonDeck', JSON.stringify(deck));
            renderDeck();
            alert(`${pokemonData.name.toUpperCase()} foi adicionado ao seu deck!`);
        }catch(error){
            console.error("Erro ao adicionar ao deck:", error);
            alert("Erro ao adicionar o Pokemon! Tente mais tarde.");
        }
    });

    function renderDeck() {
        if (deck.length === 0) {
            deckGrid.innerHTML = `
                <div class="empty-deck">
                    <div class="empty-deck-icon"> </div>
                    <p>Seu deck está vazio! Adicione Pokémon através da Pokédex.</p>
                </div>
            `;
            return;
        }

        deckGrid.innerHTML = deck.map(pokemon => {
            const hp = pokemon.stats.find(s => s.name === 'hp')?.value || 0;
            const attack = pokemon.stats.find(s => s.name === 'attack')?.value || 0;
            const defense = pokemon.stats.find(s => s.name === 'defense')?.value || 0;
            const speed = pokemon.stats.find(s => s.name === 'speed')?.value || 0;

            return `
                <div class="deck-card">
                    <div class="deck-card-header">
                        <img src="${pokemon.image}" alt="${pokemon.name}" class="deck-card-img">
                        <h3 class="deck-card-name">${pokemon.name}</h3>
                        <p class="deck-card-id">ID: #${String(pokemon.id).padStart(3, '0')}</p>
                    </div>

                    <div class="deck-card-types">
                        ${pokemon.types.map(type => 
                            `<span class="type-badge type-${type}">${type}</span>`
                        ).join('')}
                    </div>

                    <div class="deck-stats">
                        <div class="stat-row">
                            <span class="stat-name"> HP:</span>
                            <span class="stat-value">${hp}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-name"> Ataque:</span>
                            <span class="stat-value">${attack}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-name"> Defesa:</span>
                            <span class="stat-value">${defense}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-name"> Velocidade:</span>
                            <span class="stat-value">${speed}</span>
                        </div>
                    </div>

                    <div class="deck-abilities">
                        <h4> Habilidades:</h4>
                        ${pokemon.abilities.slice(0, 3).map(ability => 
                            `<span class="ability-tag">${ability.replace('-', ' ')}</span>`
                        ).join('')}
                    </div>

                    <button class="remove-btn" onclick="removeFromDeck(${pokemon.id})">
                         Remover do Deck
                    </button>
                </div>
            `;
            }).join('');
    }
    
    function removeFromDeck(pokemonId){
        const pokemonName = deck.find(p => p.id === pokemonId) ?.name || "Pokemon";

        if (confirm(`Tem certeza que deseja remover ${pokemonName.toUpperCase()} do seu deck?`)){
            deck = deck.filter(p => p.id !== pokemonId);
            localStorage.setItem('pokemonDeck', JSON.stringify(deck));
            renderDeck();
        }
    }

    fetchPokemon(currentId);
    renderDeck();


