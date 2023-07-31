import { Mob } from "../Mobs";
import { IPosition } from "../interfaces";
import { IWeapon, IWeaponCharacteristics, IWeaponCharacteristicsWithPosition } from "./interface";

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

  abstract attack(mobs: Mob[]): Promise<false | [Mob, number]>
}

// class Sword extends Weapon {
//   attack() {

//   }
// }

export class Gun extends Weapon {
  bullet: { texture: HTMLImageElement }

  constructor(weaponCharacteristics: IWeaponCharacteristics) {
    super(weaponCharacteristics);
    this.texture.src = './images/gun.png';
    this.bullet = {
      texture: new Image()
    }
    this.bullet.texture.src = './images/bullet.png';
  }

  attack(mobs: Mob[]) {
    return new Promise<false | [Mob, number]>(resolve => {
      let x = this.position.x + 150;
      const y = this.position.y - 5;
      const speed = 2;

      const drawBall = () => {
        // ctx.clearRect(x + speed - 50, y - 20, 40, 40);
        // ctx.beginPath();
        // ctx.arc(x, y, 20, 0, Math.PI * 2);
        // ctx.fillStyle = 'blue';
        // ctx.fill();
        // ctx.closePath();
        ctx.clearRect(x + speed - 50, y - 10, 40, 40);
        ctx.drawImage(this.bullet.texture, x, y);
        
      }

      const animate = () => {
        x += speed;
        drawBall();
        const damagedMobIndex = mobs.findIndex(({ position, texture }) => {
          const halfOfMobWidth = texture.width / 2;
          const halfOfMobHeight = texture.height / 2;
          return (position.x - halfOfMobWidth < x && position.x + halfOfMobWidth > x) && (position.y - halfOfMobHeight < y && position.y + halfOfMobHeight + 40 > y);
        })
        if (damagedMobIndex > -1) {
          ctx.clearRect(x + speed - 20, y, 60, 40);
          return resolve([mobs[damagedMobIndex], damagedMobIndex]);
        }

        if (canvas.width > x || 0 > canvas.width) {
          requestAnimationFrame(animate);
        } else {
          ctx.clearRect(x + speed - 40, y - 10, 40, 40);
          return resolve(false);
        }
      }

      animate();
    })
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