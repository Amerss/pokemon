export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Result {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export interface TypeData {
  damage_relations: {
    double_damage_from: NamedAPIResource[];
    double_damage_to: NamedAPIResource[];
    half_damage_from: NamedAPIResource[];
    half_damage_to: NamedAPIResource[];
    no_damage_from: NamedAPIResource[];
    no_damage_to: NamedAPIResource[];
  };
  game_indices: GameIndex[];
  NamedAPIResource: NamedAPIResource;
  id: number;
  move_damage_class: NamedAPIResource;
  moves: NamedAPIResource[];
  name: string;
  names: Name[];
  past_damage_relations: PastDamageRelation[];
  pokemon: Pokemon[];
  sprites: Sprites;
}

// 其他相关接口
interface GameIndex {
  game_index: number;
  NamedAPIResource: NamedAPIResource;
}

interface DamageRelations {
  double_damage_from: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  no_damage_to: NamedAPIResource[];
}

interface PastDamageRelation {
  damage_relations: DamageRelations;
  NamedAPIResource: NamedAPIResource;
}

interface Name {
  NamedAPIResource: NamedAPIResource;
  name: string;
}

interface Pokemon {
  pokemon: NamedAPIResource;
  slot: number;
}

interface Sprites {
  [key: string]: Sprite;
}

interface Sprite {
  name_icon: string;
}
