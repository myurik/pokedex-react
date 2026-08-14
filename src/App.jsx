import { useState, useEffect } from "react";
import { fetchPokemonList } from "./services/pokeapi";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemonList(151).then((results) => {
      setPokemons(results);
    });
  }, []);

  return (
      <div>
        <h1>Pokédex</h1>
        <ul>
          {pokemons.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;