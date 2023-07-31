import { Mob } from "../Mobs";
import { IWeapon } from "../Weapons/interface";
import { IPosition } from "../interfaces";
import { ICharacter, ICharacterCharacteristics, moveDirection } from "./interface";

const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

export class Character implements ICharacter {
  position: IPosition
  texture: HTMLImageElement
  weapon: IWeapon
  died: boolean
  private attacking: boolean

  constructor({ position, img, weapon }: ICharacterCharacteristics) {
    this.position = position;
    this.texture = new Image();
    this.texture.src = img;
    this.attacking = false;
    this.died = false
    this.weapon = weapon;
    this.takeWeapon();
  }

  private takeWeapon() {
    this.weapon.position = { x: this.position.x + 50, y: this.position.y };
    this.weapon.texture.onload = () => {
      ctx.drawImage(this.weapon.texture, this.weapon.position.x, this.weapon.position.y);
    };
  }

  drawWeapon(weapon: IWeapon) {
    this.weapon = weapon;
    this.takeWeapon();
    return weapon;
  }

  die() {
    this.died = true
    ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
  }

  move(direction: moveDirection) {
    if (this.attacking || this.died) {
      return
    }
    const moveDistance = 10;
    if (direction === 'left') {
      ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
      this.position.x -= moveDistance;
    } else if (direction === 'right') {
      ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
      this.position.x += moveDistance;
    } else if (direction === 'up') {
      ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
      this.position.y -= moveDistance;
    } else if (direction === 'down') {
      ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
      this.position.y += moveDistance;
    } else {
      return;
    }
    ctx.drawImage(this.texture, this.position.x, this.position.y);
    this.weapon.position = { x: this.position.x + 50, y: this.position.y };
    ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
  }

  async attack(mobs: Mob[]): Promise<false | [Mob, number]> {
    if (!this.died) {
      return await this.weapon.attack(mobs);
    }
    return Promise.resolve(false);
  }

  changeWeapon(weapon: IWeapon) {

  }
}