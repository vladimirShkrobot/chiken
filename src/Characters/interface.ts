import { Mob } from "../Mobs";
import { IWeapon } from "../Weapons/interface"
import { IPosition } from "../interfaces"

export type moveDirection = 'left' | 'right' | 'up' | 'down';

export interface ICharacter {
  position: IPosition;
  texture: HTMLImageElement;
  weapon: IWeapon;
  died: boolean;
  drawWeapon(weapon: IWeapon): IWeapon;
  die(): void;
  move(direction: moveDirection): void;
  attack(mobs: Mob[]): Promise<false | [Mob, number]>;
}

export interface ICharacterCharacteristics { 
  position: IPosition;
  img: string;
  weapon: IWeapon;
}