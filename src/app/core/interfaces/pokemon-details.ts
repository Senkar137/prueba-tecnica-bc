export interface PokemonDetails {
  name: string;
  url: string;
  id?: number;
  sprite?: string;
  types?: string[];
  stats?: PokemonStats[];
}

export interface PokemonStats {
  name: StatName;
  value: number;
  percentageBar?: number | null;
}

export type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';
