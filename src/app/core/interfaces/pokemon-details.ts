export interface PokemonDetails {
  name: string;
  url: string;
  sprite?: string;
  types?: string[];
  stats?: PokemonStats[];
}

export interface PokemonStats {
  name: string;
  value: number;
}
