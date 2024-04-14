export interface GameEntity {
  id: string;
  name: string;
  rarity: number;
  path: GameEntityPath;
  description: string;
  thumbnail?: string;
}

export enum GameEntityPath {
  ABUNDANCE = 'Abundance',
  DESTRUCTION = 'Destruction',
  ERUDITION = 'Erudition',
  HARMONY = 'Harmony',
  NIHILITY = 'Nihility',
  PRESERVATION = 'Preservation',
  THE_HUNT = 'The Hunt'
}

export enum GameEntityType {
  CHARACTER = 'character',
  LIGHT_CONE = 'lightcone'
}