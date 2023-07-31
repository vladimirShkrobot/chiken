import { WeaponFactory } from ".";
import { Mob } from "../Mobs";
import { IPosition } from "../interfaces";

export type Weapon = InstanceType<typeof WeaponFactory.list[keyof typeof WeaponFactory.list]>

export interface IWeaponCharacteristics {
  type: keyof typeof WeaponFactory.list
  dmg: number
  range: number

}

export interface IWeaponCharacteristicsWithPosition extends IWeaponCharacteristics {
  position?: IPosition
}

export interface IWeapon extends IWeaponCharacteristics {
  texture: HTMLImageElement
  position: IPosition
  attack: (mobs: Mob[]) => Promise<false | [Mob, number]>
}

export interface IGun extends IWeapon {
  bullet: {
    texture: HTMLImageElement
  },
  bulletCount: number
}