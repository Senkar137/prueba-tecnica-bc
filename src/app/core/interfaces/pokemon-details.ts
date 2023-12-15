export interface PokemonDetails {
  name: string;
  url: string;
  id?: number;
  sprite?: string;
  types?: string[];
  stats?: PokemonStats[];
}

export interface PokemonStats {
  name: string;
  value: number;
}
