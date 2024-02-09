import { PokemonDetails } from './pokemon-details';

export interface TrainerProfile {
  name?: string;
  favoriteHobby?: string[];
  birthdate?: Date;
  age?: number;
  isMinor?: boolean;
  dui?: string | null;
  minorityCard?: string | null;
  imageUrl?: string | null;
  imageName?: string | null;
}

export interface TrainerItem {
  name: string;
  trainerInfo: TrainerProfile;
  team: PokemonDetails[];
}
