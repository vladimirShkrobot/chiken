import { Mob } from "../Mobs";
import { IPosition } from "../interfaces";
import { IGun, IWeapon, IWeaponCharacteristics, IWeaponCharacteristicsWithPosition } from "./interface";

const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

abstract class Weapon implements IWeapon {
  dmg: number
  range: number
  texture: HTMLImageElement
  position: IPosition
  type: keyof typeof WeaponFactory.list

  constructor({ dmg, range, type, position }: IWeaponCharacteristicsWithPosition) {
    this.dmg = dmg;
    this.range = range;
    this.texture = new Image();
    this.position = position || { x: NaN, y: NaN };
    this.type = type;
  }

  abstract attack(mobs: Mob[]): void | {
    bullet: {
      speed: number,
      position: IPosition
    },
    result: Promise<false | [Mob, number]>
  }
}

// class Sword extends Weapon {
//   attack() {

//   }
// }

export class Gun extends Weapon implements IGun {
  bullet: { texture: HTMLImageElement }
  bulletCount: number

  constructor(weaponCharacteristics: IWeaponCharacteristics) {
    super(weaponCharacteristics);
    this.texture.src = './images/gun.png';
    this.bulletCount = 7;
    this.bullet = {
      texture: new Image()
    }
    this.bullet.texture.src = './images/bullet.png';
  }

  attack(mobs: Mob[]) {
    const bullet = {
      position: {
        x: this.position.x + 150,
        y: this.position.y - 5
      },
      speed: 2
    }

    if (!this.bulletCount) {
      return
    }

    return {
      bullet,
      result: new Promise<false | [Mob, number]>(resolve => {
        // let x = this.position.x + 150;
        // const y = this.position.y - 5;
        // const speed = 2;

        const drawBall = () => {
          // ctx.clearRect(x + speed - 50, y - 20, 40, 40);
          // ctx.beginPath();
          // ctx.arc(x, y, 20, 0, Math.PI * 2);
          // ctx.fillStyle = 'blue';
          // ctx.fill();
          // ctx.closePath();
          ctx.clearRect(bullet.position.x + bullet.speed - 50, bullet.position.y - 10, 40, 40);
          ctx.drawImage(this.bullet.texture, bullet.position.x, bullet.position.y);

        }

        const animate = () => {
          bullet.position.x += bullet.speed;
          drawBall();
          const damagedMobIndex = mobs.findIndex(({ position, texture }) => {
            const halfOfMobWidth = texture.width / 2;
            const halfOfMobHeight = texture.height / 2;
            return (position.x - halfOfMobWidth < bullet.position.x && position.x + halfOfMobWidth > bullet.position.x) && (position.y - halfOfMobHeight < bullet.position.y && position.y + halfOfMobHeight + 40 > bullet.position.y);
          })
          if (damagedMobIndex > -1) {
            ctx.clearRect(bullet.position.x + bullet.speed - 20, bullet.position.y, 60, 40);
            return resolve([mobs[damagedMobIndex], damagedMobIndex]);
          }

          if (canvas.width > bullet.position.x || 0 > canvas.width) {
            requestAnimationFrame(animate);
          } else {
            ctx.clearRect(bullet.position.x + bullet.speed - 40, bullet.position.y - 10, 40, 40);
            return resolve(false);
          }
        }

        animate();
        this.bulletCount--;
      })
    }

  }
}

export class WeaponFactory {

  static list = {
    Gun
  }

  create(characteristics: IWeaponCharacteristicsWithPosition) {
    return new WeaponFactory.list[characteristics.type](characteristics);
  }
}