import { Mob } from "../Mobs";
import { WeaponFactory } from "../Weapons";
import { IWeapon, Weapon } from "../Weapons/interface"
import { IPosition } from "../interfaces"

export type moveDirection = 'left' | 'right' | 'up' | 'down';

export interface ICharacter {
  position: IPosition;
  texture: HTMLImageElement;
  weapon: Weapon
  died: boolean;
  drawWeapon(weapon: IWeapon): IWeapon;
  die(): void;
  move(direction: moveDirection): void;
  attack(mobs: Mob[]): void | {
    bullet: {
      speed: number,
      position: IPosition
    },
    result: Promise<false | [Mob, number]>
  }
}

export interface ICharacterCharacteristics {
  position: IPosition;
  img: string;
  weapon: Weapon
}