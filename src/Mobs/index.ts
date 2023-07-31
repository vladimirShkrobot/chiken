import { Character } from "../Characters";
import { IPosition } from "../interfaces";
import { IMob, IMobCharacteristics } from "./interface";

const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

export abstract class Mob implements IMob {

  position: IPosition
  speed: number
  texture: HTMLImageElement
  died: boolean
  type: keyof typeof MobFactory.list
  hp: number

  constructor({ position, speed, type }: IMobCharacteristics) {
    this.position = position;
    this.speed = speed;
    this.texture = new Image();
    this.died = false
    this.type = type
    this.hp = 1;
  }

  die() {
    this.died = true;
  }

  move(enemy: Character) {
    const drawMob = () => {
      ctx.drawImage(this.texture, this.position.x, this.position.y);
    }

    const animate = () => {
      ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);
      if (enemy.position.x < this.position.x) {
        this.position.x -= this.speed;
      } else {
        this.position.x += this.speed;
      }

      if (enemy.position.y < this.position.y) {
        this.position.y -= this.speed;
      } else {
        this.position.y += this.speed;
      }

      const halfOfMobWidth = this.texture.width / 2;
      const halfOfMobHeight = this.texture.height / 2;
      if ((enemy.position.x - halfOfMobWidth < this.position.x && enemy.position.x + halfOfMobWidth > this.position.x) && (enemy.position.y - halfOfMobHeight < this.position.y && enemy.position.y + halfOfMobHeight > this.position.y)) {
        enemy.die();
      }

      drawMob();
      if (!this.died) {
        setTimeout(() => {
          requestAnimationFrame(animate);
        }, 15)
      } else {
        ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);
      }
    }
    animate();
  }
}

export class Fish extends Mob {
  constructor(characteristics: IMobCharacteristics) {
    super(characteristics);
    this.texture.src = './images/fish.png';
  }
}

export class Chestnut extends Mob {
  hp: number

  constructor(characteristics: IMobCharacteristics) {
    super(characteristics);
    this.texture.src = './images/chestnut.png';
    this.hp = 100;
  }
}

export class Cow extends Mob {
  hp: number

  constructor(characteristics: IMobCharacteristics) {
    super(characteristics);
    this.texture.src = './images/cow.png';
    this.hp = 1000;
  }
}

export class MobFactory {

  static list = {
    Fish,
    Chestnut,
    // Cow
  }

  create(characteristics: IMobCharacteristics) {
    return new MobFactory.list[characteristics.type](characteristics);
  }

  createRandom(characteristics: Omit<IMobCharacteristics, 'type'>) {
    const mobNames = Object.keys(MobFactory.list);
    const randomMobIndex = Math.floor(Math.random() * mobNames.length);
    const partialCharacteristics: Partial<IMobCharacteristics> = characteristics;
    partialCharacteristics.type = mobNames[randomMobIndex] as keyof typeof MobFactory.list;
    return new MobFactory.list[partialCharacteristics.type](partialCharacteristics as IMobCharacteristics);
  }
}