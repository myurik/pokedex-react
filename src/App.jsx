import { useState, useEffect } from "react";
import { fetchPokemonList } from "./services/pokeapi";
import { getPokemonId, getPokemonImageUrl } from "./utils/pokemon";
import "./App.css";

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