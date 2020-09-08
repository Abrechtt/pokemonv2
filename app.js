const pokemon = {
    sprite: document.getElementById('pokemon-image'),
    name: document.getElementById('pokemon-name'),
    types: document.getElementById('pokemon-types'),
    abilities: document.getElementById('pokemon-abilities')
}

const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonImages = document.getElementById('pokemon-images');

const GetPokemon = async url=>{

    const data = await fetch(url);
    const dataJson = await data.json();

    const {sprites, name, types, abilities} = dataJson;

    return await sprites.front_default;
}

const GetPokemonList = async ()=>{
    const url = `${baseUrl}/pokemon`;
    fetch(url).then(data => data.json()).then(json =>{
        //console.log(json.results);
        const urlList = json.results.map(element => element.url);
        //console.log(urlList);
        const spriteList = urlList.map(pokemonUrl => GetPokemon(pokemonUrl));
        spriteList.forEach(async sprite => {
            await sprite;
            const currentPokemonImg = document.createElement('img');
            currentPokemonImg.src = await sprite;
            currentPokemonImg.className = 'pokemonImage';
            pokemonImages.appendChild(currentPokemonImg);

            currentPokemonImg.onclick = ()=> {
                sessionStorage.setItem('urlList', JSON.stringify(urlList));
                sessionStorage.setItem('sprite', currentPokemonImg.src);
                window.location.href = 'file:///C:/Users/jabre/hiper-media/pokemon.htm';
            }
            //console.log(await sprite);
        });
    });
}

const GetAbilityInfo= async (url, abilityName)=>{

    const data = await fetch(url);
    const dataJson = await data.json();
    const{effect_entries} = dataJson;

    let effectsList = '';

    effect_entries.forEach(element => {

        const{effect, language} = element;

        if(language.name === 'en'){
            //console.log(effect);
            effectsList += `<li>${effect}</li>`;
        }
    });

    pokemon.abilities.innerHTML += 
    `<li>
        ${abilityName}
        <div>effect</div>
        <ul>
            ${effectsList}
        </ul>
    </li>`;
}

GetPokemon('https://pokeapi.co/api/v2/pokemon/infernape');

GetPokemonList();