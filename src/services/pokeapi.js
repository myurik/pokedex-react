const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit= 151){
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results; //array de {name, url}
}

export async function fetchPokemonDetails(url){
    const response = await fetch(url);
    return response.json();
}
