import { MobFactory } from ".";
import { IPosition } from "../interfaces";

export interface IMobCharacteristics {
  position: IPosition
  speed: number,
  type: keyof typeof MobFactory.list
}

export interface IMob extends IMobCharacteristics {
  texture: HTMLImageElement
  died: boolean
}