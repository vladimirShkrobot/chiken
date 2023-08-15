import { IPosition } from "../interfaces";
import { getRandomNumber } from "../utils";
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
  drop: {
    bullets: number
  }

  constructor({ position, speed, type, drop }: IMobCharacteristics) {
    this.position = position;
    this.speed = speed;
    this.texture = new Image();
    this.died = false
    this.type = type
    this.hp = 1;
    this.drop = drop || {
      bullets: 0
    }
  }

  die() {
    this.died = true;
  }

  move<T extends { position: IPosition, die: Function }>(enemy: T) {
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
    this.drop = {
      bullets: 1
    }
  }
}

export class Chestnut extends Mob {
  hp: number

  constructor(characteristics: IMobCharacteristics) {
    super(characteristics);
    this.texture.src = './images/chestnut.png';
    this.hp = 100;
    this.drop = {
      bullets: 7
    }
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

  createRandomWithRandomPosition(characteristics: Omit<IMobCharacteristics, 'type' | 'position'>) {
    const partialCharacteristics: Partial<IMobCharacteristics> = characteristics;
    partialCharacteristics.position = this.calculateRandomBehindScreenPosition();
    const randomMob = this.createRandom(partialCharacteristics as Omit<IMobCharacteristics, 'type'>);
    return randomMob;
  }

  private calculateRandomBehindScreenPosition() {
    if (getRandomNumber(0, 1)) {
      return {
        x: getRandomNumber(-100, window.innerWidth + 100),
        y: getRandomNumber(0, 1) ? -100 : window.innerHeight + 100
      }
    } else {
      return {
        x: getRandomNumber(0, 1) ? -100 : window.innerWidth + 100,
        y: getRandomNumber(-100, window.innerHeight + 100)
      }
    }
  }
}