export function getPokemonId(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function getPokemonImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}