const state = {
  currentPokemonId: 1, 
  currentPokemonData: null,
  
  favorites: JSON.parse(localStorage.getItem('pokedex_favorites')) || [
    { id: 2, name: 'ivysaur', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
    { id: 6, name: 'charizard', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
    { id: 249, name: 'lugia', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png' },
    { id: 384, name: 'rayquaza', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png' },
    { id: 1, name: 'bulbasaur', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' }
  ],
  
  history: JSON.parse(localStorage.getItem('pokedex_history')) || [
    { id: 2, name: 'ivysaur', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' }
  ],
  
  catalog: [],
  catalogOffset: 0,
  catalogLoaded: false
};


const nameAliases = {
  'bulbassauro': 'bulbasaur',
  'charmandinho': 'charmander',
  'esguicho': 'squirtle',
  'pikachu': 'pikachu',
  'ivyssauro': 'ivysaur',
  'venussauro': 'venusaur'
};


const typeConfig = {
  grass: { icon: '🍃', color: '#5ca434' },
  fire: { icon: '🔥', color: '#f08030' },
  water: { icon: '💧', color: '#539ae2' },
  electric: { icon: '⚡', color: '#fac000' },
  bug: { icon: '🐛', color: '#91c12f' },
  normal: { icon: '⭐', color: '#a8a878' },
  poison: { icon: '☠️', color: '#a040a0' },
  ground: { icon: '🌍', color: '#dfb352' },
  flying: { icon: '🕊️', color: '#8fa8dd' },
  psychic: { icon: '🔮', color: '#f85888' },
  rock: { icon: '🪨', color: '#b8a038' },
  ice: { icon: '❄️', color: '#6fd1d1' },
  ghost: { icon: '👻', color: '#6e5687' },
  dragon: { icon: '🐉', color: '#7038f8' },
  steel: { icon: '⚙️', color: '#b8b8d0' },
  fairy: { icon: '✨', color: '#e79fe7' },
  dark: { icon: '🌙', color: '#705848' },
  fighting: { icon: '🥊', color: '#c03028' }
};


const customDescriptions = {
  1: "BULBASAUR É UMA CRIATURA REPTILIANA QUE DE ALGUM JEITO LEMBRA UM SAPO OU UM DINOSSAURO JOVEM COM UM MANCHAS VERDE-AZULADAS ESCONDIDAS. TEM TRÊS DEDOS BRANCOS OU GARRAS CRESCENDO FORA DE SUAS QUATRO PERNAS. SEUS OLHOS SÃO DE UM VERMELHO BRILHANTE, MAS A CARACTERÍSTICA MAIS NOTÁVEL DESTE POKÉMON É O BULBO DE CEBOLA COMO SOBRE AS SUAS COSTAS. ESTE BULBO TEM UMA RELAÇÃO SIMBIÓTICA COM OS POKÉMONS.",
  2: "QUANDO O BULBO EM SUAS COSTAS CRESCE, ELE PARECE PERDER A CAPACIDADE DE FICAR EM PÉ SOBRE AS PATAS TRASEIRAS.",
  3: "A PLANTA FLORESCE QUANDO ABSORVE ENERGIA SOLAR. ELE PERMANECE EM MOVIMENTO CONSTANTE PARA BUSCAR A LUZ DO SOL.",
  4: "A CHAMA QUE QUEIMA NA PONTA DE SUA CAUDA É UMA INDICAÇÃO DE SUAS EMOÇÕES. A CHAMA OSCILA QUANDO ELE ESTÁ FELIZ.",
  5: "ELE DERRUBA SEUS INIMIGOS USANDO SUAS GARRAS AFIADAS. SE ENCONTRAR UM INIMIGO FORTE, ELE FICA MAIS AGRESSIVO.",
  6: "COSPE FOGO TÃO QUENTE QUE PODE DERRETER ROCHAS. COSTUMA CAUSAR INCÊNDIOS FLORESTAIS SEM QUERER.",
  7: "APÓS O NASCIMENTO, SUAS COSTAS INCHAM E ENDURECEM FORMANDO UMA CASCA. ELE ESPIRRA ESPUMA PODEROSA PELA BOCA.",
  9: "UM POKÉMON BRUTAL COM CANHÕES DE ÁGUA EMBUTIDOS EM SUA CARAPAÇA. OS JATOS DE ÁGUA PODEM PERFURAR AÇO.",
  25: "QUANDO VÁRIOS DESSES POKÉMON SE REÚNEM, SUA ELETRICIDADE PODE SE ACUMULAR E CAUSAR TEMPESTADES DE RAIOS.",
  150: "FOI CRIADO POR UM CIENTISTA APÓS ANOS DE HORRÍVEIS EXPERIMENTOS DE ENGENHARIA GENÉTICA E DIVISÃO DE DNA."
};


const descriptionCache = {};


async function translateToPortuguese(text) {
  if (!text) return '';
  const clean = text.replace(/[\f\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
  if (descriptionCache[clean]) return descriptionCache[clean];

  try {
    const encoded = encodeURIComponent(clean);
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encoded}`);
    if (!response.ok) throw new Error('Falha na resposta do tradutor');
    const data = await response.json();
    if (data && data[0]) {
      const translated = data[0].map(item => item[0]).join('');
      descriptionCache[clean] = translated;
      return translated;
    }
    return clean;
  } catch (err) {
    console.warn('Não foi possível traduzir automaticamente:', err);
    return clean;
  }
}



const screens = {
  login: document.getElementById('screen-login'),
  createAccount: document.getElementById('screen-create-account'),
  loading: document.getElementById('screen-loading'),
  pokedex: document.getElementById('screen-pokedex'),
  favorites: document.getElementById('screen-favorites'),
  list: document.getElementById('screen-list')
};


const elPokemonId = document.getElementById('pokemon-id');
const elPokemonSprite = document.getElementById('pokemon-sprite');
const elBtnToggleFavorite = document.getElementById('btn-toggle-favorite');
const elTypeBadgeCircle = document.getElementById('type-badge-circle');
const elTypeIconSymbol = document.getElementById('type-icon-symbol');
const elAbilitiesList = document.getElementById('abilities-list');
const elSearchInput = document.getElementById('search-input');
const elSearchBtn = document.getElementById('search-btn');
const elStatSpeed = document.getElementById('stat-speed');
const elStatHp = document.getElementById('stat-hp');
const elStatAttack = document.getElementById('stat-attack');
const elPokemonDescription = document.getElementById('pokemon-description');
const elHistoryList = document.getElementById('history-list');
const elFavoritesGrid = document.getElementById('favorites-grid');
const elBtnActionFavorite = document.getElementById('btn-action-favorite');
const elFavActionStar = document.getElementById('fav-action-star');
const elFavActionText = document.getElementById('fav-action-text');
const elLoadingFill = document.getElementById('loading-fill');
const elLoadingDot = document.getElementById('loading-dot');


const elPokemonCatalogGrid = document.getElementById('pokemon-catalog-grid');
const elListSearchInput = document.getElementById('list-search-input');
const elListBadgeCount = document.getElementById('list-badge-count');
const elBtnLoadMore = document.getElementById('btn-load-more');



function showScreen(screenName) {
  
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
  });

  
  if (screens[screenName]) {
    screens[screenName].classList.add('active');
    window.scrollTo(0, 0);
  }
}


function startLoadingSequence() {
  showScreen('loading');

  let progress = 0;
  elLoadingFill.style.width = '0%';
  elLoadingDot.style.left = '0%';

  const interval = setInterval(() => {
    progress += 4;
    elLoadingFill.style.width = `${progress}%`;
    elLoadingDot.style.left = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        showScreen('pokedex');
        
        loadPokemon(state.currentPokemonId);
      }, 300);
    }
  }, 40); 
}





async function fetchPokemonData(pokemonQuery) {
  try {
    let cleanQuery = String(pokemonQuery).toLowerCase().trim();
    
    if (nameAliases[cleanQuery]) {
      cleanQuery = nameAliases[cleanQuery];
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${cleanQuery}`);
    if (!response.ok) {
      throw new Error('Pokémon não encontrado!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    return null;
  }
}


async function fetchPokemonSpecies(idOrName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`);
    if (!response.ok) return null;
    const speciesData = await response.json();
    return speciesData;
  } catch (error) {
    console.error('Erro ao buscar espécie do Pokémon:', error);
    return null;
  }
}



async function loadPokemon(idOrName) {
  
  elSearchInput.placeholder = "BUSCANDO...";

  const pokemon = await fetchPokemonData(idOrName);

  if (!pokemon) {
    alert("Pokémon não encontrado! Tente buscar por outro nome ou número.");
    elSearchInput.placeholder = "BULBASSAURO";
    return;
  }

  state.currentPokemonData = pokemon;
  state.currentPokemonId = pokemon.id;

  
  const formattedId = '#' + String(pokemon.id).padStart(3, '0');
  elPokemonId.textContent = formattedId;

  
  elSearchInput.value = pokemon.name.toUpperCase();

  
  const animatedSprite = pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
  const staticSprite = pokemon.sprites.front_default;
  elPokemonSprite.src = animatedSprite || staticSprite || 'assets/blastoise.png';

  
  const speedStat = pokemon.stats.find(s => s.stat.name === 'speed');
  const hpStat = pokemon.stats.find(s => s.stat.name === 'hp');
  const attackStat = pokemon.stats.find(s => s.stat.name === 'attack');

  elStatSpeed.textContent = speedStat ? speedStat.base_stat : 0;
  elStatHp.textContent = hpStat ? hpStat.base_stat : 0;
  elStatAttack.textContent = attackStat ? attackStat.base_stat : 0;

  
  const primaryType = pokemon.types[0]?.type?.name || 'normal';
  const typeInfo = typeConfig[primaryType] || { icon: '⭐', color: '#5ca434' };
  
  elTypeBadgeCircle.style.backgroundColor = typeInfo.color;
  elTypeIconSymbol.textContent = typeInfo.icon;
  elTypeBadgeCircle.title = `Tipo: ${primaryType.toUpperCase()}`;

  
  elAbilitiesList.innerHTML = '';
  pokemon.abilities.slice(0, 2).forEach(item => {
    const pill = document.createElement('span');
    pill.className = 'ability-pill';
    pill.textContent = item.ability.name.toUpperCase();
    elAbilitiesList.appendChild(pill);
  });


  
  updateFavoriteStar();

  
  if (customDescriptions[pokemon.id]) {
    elPokemonDescription.textContent = customDescriptions[pokemon.id];
  } else {
    
    elPokemonDescription.textContent = "BUSCANDO DESCRIÇÃO EM PORTUGUÊS...";
    const species = await fetchPokemonSpecies(pokemon.id);
    if (species && species.flavor_text_entries) {
      
      const ptEntry = species.flavor_text_entries.find(e => e.language.name === 'pt' || e.language.name === 'pt-BR');
      
      if (ptEntry) {
        elPokemonDescription.textContent = ptEntry.flavor_text.replace(/[\f\n\r]/g, ' ').toUpperCase();
      } else {
        
        const enEntry = species.flavor_text_entries.find(e => e.language.name === 'en');
        if (enEntry) {
          const translatedText = await translateToPortuguese(enEntry.flavor_text);
          elPokemonDescription.textContent = translatedText.toUpperCase();
        } else {
          elPokemonDescription.textContent = `${pokemon.name.toUpperCase()} É UM POKÉMON DO TIPO ${primaryType.toUpperCase()}.`;
        }
      }
    } else {
      elPokemonDescription.textContent = `${pokemon.name.toUpperCase()} É UM POKÉMON DO TIPO ${primaryType.toUpperCase()}.`;
    }
  }

  
  addToHistory({
    id: pokemon.id,
    name: pokemon.name,
    sprite: staticSprite
  });
}



function isCurrentPokemonFavorite() {
  return state.favorites.some(fav => fav.id === state.currentPokemonId);
}

function updateFavoriteStar() {
  const isFav = isCurrentPokemonFavorite();

  if (isFav) {
    
    elBtnToggleFavorite.classList.add('is-favorite');
    elBtnToggleFavorite.title = "Remover dos Favoritos";

    
    if (elBtnActionFavorite) {
      elBtnActionFavorite.classList.add('is-favorite');
      elBtnActionFavorite.title = "Clique para remover dos favoritos";
      elFavActionStar.textContent = "★";
      elFavActionText.textContent = "FAVORITADO!";
    }
  } else {
    
    elBtnToggleFavorite.classList.remove('is-favorite');
    elBtnToggleFavorite.title = "Adicionar aos Favoritos";

    
    if (elBtnActionFavorite) {
      elBtnActionFavorite.classList.remove('is-favorite');
      elBtnActionFavorite.title = "Clique para adicionar aos favoritos";
      elFavActionStar.textContent = "☆";
      elFavActionText.textContent = "FAVORITAR";
    }
  }
}

function toggleFavorite() {
  if (!state.currentPokemonData) return;

  const currentId = state.currentPokemonData.id;
  const isFav = isCurrentPokemonFavorite();

  if (isFav) {
    
    state.favorites = state.favorites.filter(fav => fav.id !== currentId);
  } else {
    
    if (state.favorites.length >= 10) {
      alert("Sua lista de favoritos atingiu o limite de 10 Pokémons!");
      return;
    }

    state.favorites.push({
      id: state.currentPokemonData.id,
      name: state.currentPokemonData.name,
      sprite: state.currentPokemonData.sprites.front_default
    });
  }

  
  localStorage.setItem('pokedex_favorites', JSON.stringify(state.favorites));
  
  updateFavoriteStar();
  renderFavoritesGrid();
}


function renderFavoritesGrid() {
  elFavoritesGrid.innerHTML = '';

  const totalSlots = 10;

  for (let i = 0; i < totalSlots; i++) {
    const card = document.createElement('div');

    if (i < state.favorites.length) {
      const fav = state.favorites[i];
      card.className = 'fav-card';
      card.title = `Ver ${fav.name.toUpperCase()}`;

      
      const idSpan = document.createElement('span');
      idSpan.className = 'fav-card-id';
      idSpan.textContent = '#' + String(fav.id).padStart(3, '0');

      
      const spriteImg = document.createElement('img');
      spriteImg.className = 'fav-card-sprite';
      spriteImg.src = fav.sprite;
      spriteImg.alt = fav.name;

      
      const star = document.createElement('span');
      star.className = 'fav-card-star';
      star.textContent = '★';

      card.appendChild(idSpan);
      card.appendChild(spriteImg);
      card.appendChild(star);

      
      card.addEventListener('click', () => {
        showScreen('pokedex');
        loadPokemon(fav.id);
      });

    } else {
      
      card.className = 'fav-card empty-slot';
    }

    elFavoritesGrid.appendChild(card);
  }
}



function addToHistory(item) {
  
  state.history = state.history.filter(h => h.id !== item.id);
  
  state.history.unshift(item);

  
  if (state.history.length > 6) {
    state.history.pop();
  }

  localStorage.setItem('pokedex_history', JSON.stringify(state.history));
  renderHistory();
}

function renderHistory() {
  elHistoryList.innerHTML = '';

  state.history.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.dataset.pokemon = item.name;

    const img = document.createElement('img');
    img.className = 'history-thumb';
    img.src = item.sprite;
    img.alt = item.name;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'history-name';
    nameSpan.textContent = item.name;

    li.appendChild(img);
    li.appendChild(nameSpan);

    
    li.addEventListener('click', () => {
      loadPokemon(item.id);
    });

    elHistoryList.appendChild(li);
  });
}



document.addEventListener('DOMContentLoaded', () => {

  
  document.getElementById('btn-guest').addEventListener('click', () => {
    startLoadingSequence();
  });

  
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    startLoadingSequence();
  });

  
  document.getElementById('btn-create-account').addEventListener('click', () => {
    showScreen('createAccount');
  });

  document.getElementById('btn-back-login').addEventListener('click', () => {
    showScreen('login');
  });

  document.getElementById('create-account-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const user = document.getElementById('register-user').value.trim();
    const pass = document.getElementById('register-pass').value.trim();

    if (!name || !user || !pass) {
      alert('Preencha nome, login e senha para criar a conta.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('pokedex_users')) || [];
    const userExists = existingUsers.some(item => item.user.toLowerCase() === user.toLowerCase());

    if (userExists) {
      alert('Este login já está em uso. Escolha outro nome de treinador.');
      return;
    }

    existingUsers.push({ name, user, pass });
    localStorage.setItem('pokedex_users', JSON.stringify(existingUsers));

    document.getElementById('login-user').value = user;
    document.getElementById('login-pass').value = pass;
    document.getElementById('create-account-form').reset();

    alert('Conta criada com sucesso! Você já pode entrar.');
    showScreen('login');
  });

  
  elSearchBtn.addEventListener('click', () => {
    const query = elSearchInput.value.trim();
    if (query) {
      loadPokemon(query);
    }
  });

  
  elSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = elSearchInput.value.trim();
      if (query) {
        loadPokemon(query);
      }
    }
  });

  
  document.getElementById('btn-prev-pokemon').addEventListener('click', () => {
    if (state.currentPokemonId > 1) {
      loadPokemon(state.currentPokemonId - 1);
    }
  });

  
  document.getElementById('btn-next-pokemon').addEventListener('click', () => {
    loadPokemon(state.currentPokemonId + 1);
  });

  
  window.addEventListener('keydown', (e) => {
    
    if (document.activeElement === elSearchInput) return;

    if (screens.pokedex.classList.contains('active')) {
      if (e.key === 'ArrowLeft' && state.currentPokemonId > 1) {
        loadPokemon(state.currentPokemonId - 1);
      } else if (e.key === 'ArrowRight') {
        loadPokemon(state.currentPokemonId + 1);
      }
    }
  });

  
  elBtnToggleFavorite.addEventListener('click', () => {
    toggleFavorite();
  });

  
  document.getElementById('btn-open-favorites').addEventListener('click', () => {
    renderFavoritesGrid();
    showScreen('favorites');
  });

  
  document.getElementById('btn-back-pokedex').addEventListener('click', () => {
    showScreen('pokedex');
  });

  
  document.getElementById('btn-logout').addEventListener('click', () => {
    showScreen('login');
  });

  
  if (elBtnActionFavorite) {
    elBtnActionFavorite.addEventListener('click', () => {
      toggleFavorite();
    });
  }

  
  const btnOpenList = document.getElementById('btn-open-list');
  if (btnOpenList) {
    btnOpenList.addEventListener('click', () => {
      showScreen('list');
      if (!state.catalogLoaded) {
        loadPokemonCatalog();
      }
    });
  }

  
  const btnBackFromList = document.getElementById('btn-back-from-list');
  if (btnBackFromList) {
    btnBackFromList.addEventListener('click', () => {
      showScreen('pokedex');
    });
  }

  
  if (elListSearchInput) {
    elListSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) {
        renderCatalogGrid(state.catalog);
        return;
      }
      const filtered = state.catalog.filter(p => 
        p.name.toLowerCase().includes(term) ||
        String(p.id) === term ||
        ('#' + String(p.id).padStart(3, '0')).includes(term)
      );
      renderCatalogGrid(filtered);
    });
  }

  
  if (elBtnLoadMore) {
    elBtnLoadMore.addEventListener('click', () => {
      loadPokemonCatalog();
    });
  }

  
  renderHistory();
  renderFavoritesGrid();
});


const CATALOG_PAGE_SIZE = 50;

async function loadPokemonCatalog() {
  if (elBtnLoadMore) {
    elBtnLoadMore.textContent = "CARREGANDO POKÉMONS...";
    elBtnLoadMore.disabled = true;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${CATALOG_PAGE_SIZE}&offset=${state.catalogOffset}`);
    if (!res.ok) throw new Error("Falha ao carregar lista de Pokémons");
    const data = await res.json();

    const newItems = data.results.map(item => {
      const id = parseInt(item.url.split('/').filter(Boolean).pop());
      return {
        id: id,
        name: item.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      };
    });

    state.catalog.push(...newItems);
    state.catalogOffset += CATALOG_PAGE_SIZE;
    state.catalogLoaded = true;

    renderCatalogGrid(state.catalog);

    if (elListBadgeCount) {
      elListBadgeCount.textContent = `${state.catalog.length} DE ${data.count} POKÉMONS`;
    }

    if (elBtnLoadMore) {
      elBtnLoadMore.disabled = false;
      elBtnLoadMore.textContent = "CARREGAR MAIS POKÉMONS ⬇";
      if (state.catalogOffset >= data.count) {
        elBtnLoadMore.style.display = 'none';
      }
    }
  } catch (err) {
    console.error("Erro ao carregar catálogo:", err);
    if (elBtnLoadMore) {
      elBtnLoadMore.disabled = false;
      elBtnLoadMore.textContent = "ERRO. CLIQUE PARA TENTAR NOVAMENTE";
    }
  }
}

function renderCatalogGrid(items) {
  if (!elPokemonCatalogGrid) return;
  elPokemonCatalogGrid.innerHTML = '';

  if (items.length === 0) {
    elPokemonCatalogGrid.innerHTML = '<p style="color:white; grid-column: 1/-1; text-align: center; font-size: 10px; padding: 30px;">NENHUM POKÉMON ENCONTRADO NESSA BUSCA.</p>';
    return;
  }

  items.forEach(pokemon => {
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.title = `Clique para abrir o card de ${pokemon.name.toUpperCase()} (#${String(pokemon.id).padStart(3, '0')})`;

    const idSpan = document.createElement('span');
    idSpan.className = 'catalog-card-id';
    idSpan.textContent = '#' + String(pokemon.id).padStart(3, '0');

    const img = document.createElement('img');
    img.className = 'catalog-card-sprite';
    img.src = pokemon.sprite;
    img.alt = pokemon.name;
    img.loading = "lazy";

    const nameSpan = document.createElement('span');
    nameSpan.className = 'catalog-card-name';
    nameSpan.textContent = pokemon.name;

    card.appendChild(idSpan);
    card.appendChild(img);
    card.appendChild(nameSpan);

    
    card.addEventListener('click', () => {
      showScreen('pokedex');
      loadPokemon(pokemon.id);
    });

    elPokemonCatalogGrid.appendChild(card);
  });
}
