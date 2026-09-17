import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchPokemonList } from "./services/pokeapi";

vi.mock("./services/pokeapi");

const mockPokemons = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
];

describe("App", () => {
    it("renderiza o título Pokédex", async () => {
        fetchPokemonList.mockResolvedValue([]);
        render(<App />);
        expect(await screen.findByText("Pokédex")).toBeInTheDocument();
    });

    it("renderiza o campo de busca", async () => {
        fetchPokemonList.mockResolvedValue([]);
        render(<App />);
        expect(
            await screen.findByPlaceholderText("Buscar Pokémon...")
        ).toBeInTheDocument();
    });

  it("exibe os pokemons depois que os dados chegam", async () => {
    fetchPokemonList.mockResolvedValue(mockPokemons);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("filtra a lista ao digitar na busca", async () => {
    fetchPokemonList.mockResolvedValue(mockPokemons);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await userEvent.type(input, "char");

    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });
});