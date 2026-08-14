import { useState, useEffect } from "react";
import { fetchPokemonList } from "./services/pokeapi";
import "./App.css";

function getPokemonId(url) {
  // a url é algo como "https://pokeapi.co/api/v2/pokemon/25/"
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1]; // pega o último pedaço, que é o ID
}

function getPokemonImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPokemonList(151).then((results) => {
      setPokemons(results);
    });
  }, []);
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.includes(search.toLowerCase())
  );
  return (
      <div>
        <h1>Pokédex</h1>
          <input
              type="text"
              placeholder="Buscar Pokémon..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
          />

        <ul>
          { filteredPokemons.map((pokemon) => {
            const id = getPokemonId(pokemon.url);
            const imageUrl = getPokemonImageUrl(id);
            return (
                <li key={pokemon.name}>
                  <img src={imageUrl} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                </li>
            );
          })}
        </ul>
      </div>
  );
}

export default App;