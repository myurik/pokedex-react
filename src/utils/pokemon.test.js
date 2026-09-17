import { describe, it, expect } from "vitest";
import { getPokemonId, getPokemonImageUrl } from "./pokemon";

describe("getPokemonId", () => {
  it("extrai o id correto de uma url da PokeAPI", () => {
    const url = "https://pokeapi.co/api/v2/pokemon/25/";
    expect(getPokemonId(url)).toBe("25");
  });

  it("funciona mesmo sem a barra final na url", () => {
    const url = "https://pokeapi.co/api/v2/pokemon/1";
    expect(getPokemonId(url)).toBe("1");
  });
});

describe("getPokemonImageUrl", () => {
  it("monta a url da imagem oficial a partir do id", () => {
    const url = getPokemonImageUrl("25");
    expect(url).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    );
  });
});