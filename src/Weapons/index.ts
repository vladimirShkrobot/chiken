import { GameMap } from "../Maps";
import { Mob } from "../Mobs";
import { IPosition } from "../interfaces";
import {
  IGun,
  IWeapon,
  IWeaponCharacteristics,
  IWeaponCharacteristicsWithPosition,
} from "./interface";

abstract class Weapon implements IWeapon {
  dmg: number;
  range: number;
  texture: HTMLImageElement;
  position: IPosition;
  type: keyof typeof WeaponFactory.list;
  gameMap: GameMap;

  constructor(
    { dmg, range, type, position }: IWeaponCharacteristicsWithPosition,
    gameMap: GameMap
  ) {
    this.gameMap = gameMap;
    this.dmg = dmg;
    this.range = range;
    this.texture = new Image();
    this.position = position || { x: NaN, y: NaN };
    this.type = type;
  }

  abstract attack(mobs: Mob[]): void | {
    bullet: {
      speed: number;
      position: IPosition;
    };
    result: Promise<false | [Mob, number]>;
  };
}

// class Sword extends Weapon {
//   attack() {

//   }
// }

export class Gun extends Weapon implements IGun {
  bullet: { texture: HTMLImageElement };
  bulletCount: number;

  constructor(weaponCharacteristics: IWeaponCharacteristics, gameMap: GameMap) {
    super(weaponCharacteristics, gameMap);
    this.texture.src = "./images/gun.png";
    this.bulletCount = 7;
    this.bullet = {
      texture: new Image(),
    };
    this.bullet.texture.src = "./images/bullet.png";
  }

  attack() {
    const bullet = {
      position: {
        x: this.position.x + 150,
        y: this.position.y - 5,
      },
      speed: 2,
    };

    if (!this.bulletCount) {
      return;
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
          this.gameMap.ctx.clearRect(
            bullet.position.x + bullet.speed - 50,
            bullet.position.y - 10,
            40,
            40
          );
          this.gameMap.ctx.drawImage(
            this.bullet.texture,
            bullet.position.x,
            bullet.position.y
          );
        };

        const animate = () => {
          bullet.position.x += bullet.speed;
          let hit = false;
          drawBall();
          // const damagedMobIndex = mobs.findIndex(({ position, texture }) => {
          //   const halfOfMobWidth = texture.width / 2;
          //   const halfOfMobHeight = texture.height / 2;
          //   return (
          //     position.x - halfOfMobWidth < bullet.position.x &&
          //     position.x + halfOfMobWidth > bullet.position.x &&
          //     position.y - halfOfMobHeight < bullet.position.y &&
          //     position.y + halfOfMobHeight + 40 > bullet.position.y
          //   );
          // });
          // if (damagedMobIndex > -1) {
          //   ctx.clearRect(
          //     bullet.position.x + bullet.speed - 20,
          //     bullet.position.y,
          //     60,
          //     40
          //   );
          //   return resolve([mobs[damagedMobIndex], damagedMobIndex]);
          // }

          // if (canvas.width > bullet.position.x || 0 > canvas.width) {
          //   requestAnimationFrame(animate);
          // } else {
          //   ctx.clearRect(
          //     bullet.position.x + bullet.speed - 40,
          //     bullet.position.y - 10,
          //     40,
          //     40
          //   );
          //   return resolve(false);
          // }

          this.gameMap.observer.fire("bulletMove", {
            attack: {
              position: {
                x: bullet.position.x,
                y: bullet.position.y,
              },
              dmg: this.dmg,
            },
            hit: () => {
              hit = true;
            },
          });
          if (
            !hit &&
            (this.gameMap.canvas.width > bullet.position.x ||
              0 > this.gameMap.canvas.width)
          ) {
            requestAnimationFrame(animate);
          } else {
            this.gameMap.ctx.clearRect(
              bullet.position.x + bullet.speed - 20,
              bullet.position.y - 5,
              60,
              40
            );
          }
        };

        animate();
        this.bulletCount--;
        this.gameMap.observer.fire("weaponAttack");
      }),
    };
  }
}

export class WeaponFactory {
  static list = {
    Gun,
  };

  create(
    characteristics: IWeaponCharacteristicsWithPosition,
    gameMap: GameMap
  ) {
    return new WeaponFactory.list[characteristics.type](
      characteristics,
      gameMap
    );
  }
}
