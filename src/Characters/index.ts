import { GameMap } from "../Maps";
import { Mob } from "../Mobs";
import { IWeapon, Weapon } from "../Weapons/interface";
import { IPosition } from "../interfaces";
import {
  ICharacter,
  ICharacterCharacteristics,
  moveDirection,
} from "./interface";

export class Character implements ICharacter {
  gameMap: GameMap;
  position: IPosition;
  texture: HTMLImageElement;
  weapon: Weapon;
  died: boolean;
  private attacking: boolean;

  constructor(
    { position, img, weapon }: ICharacterCharacteristics,
    gameMap: GameMap
  ) {
    this.gameMap = gameMap;
    this.position = position;
    this.texture = new Image();
    this.texture.src = img;
    this.attacking = false;
    this.died = false;
    this.weapon = weapon;
    this.takeWeapon();
    this.control();

    this.gameMap.observer.on("mobDie", (mob: Mob) => {
      if (mob.drop.bullets) {
        this.weapon.bulletCount += mob.drop.bullets;
        this.gameMap.observer.fire("characterTakesBullets", mob.drop.bullets);
      }
    });
  }

  control() {
    const moveIntervals: {
      left: NodeJS.Timer | null;
      right: NodeJS.Timer | null;
      up: NodeJS.Timer | null;
      down: NodeJS.Timer | null;
    } = {
      left: null,
      right: null,
      up: null,
      down: null,
    };

    document.addEventListener("keydown", async event => {
      if (event.repeat) {
        return;
      }
      switch (event.key) {
        case "ArrowLeft":
          if (moveIntervals.left !== null) {
            clearInterval(moveIntervals.left);
          }
          moveIntervals.left = setInterval(() => {
            this.move("left");
          }, 33);
          break;
        case "ArrowRight":
          if (moveIntervals.right !== null) {
            clearInterval(moveIntervals.right);
          }
          moveIntervals.right = setInterval(() => {
            this.move("right");
          }, 33);
          break;
        case "ArrowUp":
          if (moveIntervals.up !== null) {
            clearInterval(moveIntervals.up);
          }
          moveIntervals.up = setInterval(() => {
            this.move("up");
          }, 33);
          break;
        case "ArrowDown":
          if (moveIntervals.down !== null) {
            clearInterval(moveIntervals.down);
          }
          moveIntervals.down = setInterval(() => {
            this.move("down");
          }, 33);
          break;
      }

      if (event.key === "x") {
        this.attack();
      }
    });

    document.addEventListener("keyup", function (event) {
      switch (event.key) {
        case "ArrowLeft":
          if (moveIntervals.left !== null) {
            clearInterval(moveIntervals.left);
          }
          break;
        case "ArrowRight":
          if (moveIntervals.right !== null) {
            clearInterval(moveIntervals.right);
          }
          break;
        case "ArrowUp":
          if (moveIntervals.up !== null) {
            clearInterval(moveIntervals.up);
          }
          break;
        case "ArrowDown":
          if (moveIntervals.down !== null) {
            clearInterval(moveIntervals.down);
          }
          break;
      }
    });
  }

  private takeWeapon() {
    this.weapon.position = { x: this.position.x + 50, y: this.position.y };
    this.weapon.texture.onload = () => {
      this.gameMap.ctx.drawImage(
        this.weapon.texture,
        this.weapon.position.x,
        this.weapon.position.y
      );
    };
  }

  drawWeapon(weapon: Weapon) {
    this.weapon = weapon;
    this.takeWeapon();
    return weapon;
  }

  die() {
    this.died = true;
    this.gameMap.ctx.clearRect(
      this.position.x + 10,
      this.position.y,
      this.texture.width + this.weapon.texture.width - 30,
      this.weapon.texture.height
    );
  }

  move(direction: moveDirection) {
    if (this.attacking || this.died) {
      return;
    }
    const moveDistance = 10;
    if (direction === "left") {
      this.gameMap.ctx.clearRect(
        this.position.x + 10,
        this.position.y,
        this.texture.width + this.weapon.texture.width - 30,
        this.weapon.texture.height
      );
      this.position.x -= moveDistance;
    } else if (direction === "right") {
      this.gameMap.ctx.clearRect(
        this.position.x + 10,
        this.position.y,
        this.texture.width + this.weapon.texture.width - 30,
        this.weapon.texture.height
      );
      this.position.x += moveDistance;
    } else if (direction === "up") {
      this.gameMap.ctx.clearRect(
        this.position.x + 10,
        this.position.y,
        this.texture.width + this.weapon.texture.width - 30,
        this.weapon.texture.height
      );
      this.position.y -= moveDistance;
    } else if (direction === "down") {
      this.gameMap.ctx.clearRect(
        this.position.x + 10,
        this.position.y,
        this.texture.width + this.weapon.texture.width - 30,
        this.weapon.texture.height
      );
      this.position.y += moveDistance;
    } else {
      return;
    }
    this.weapon.position = { x: this.position.x + 50, y: this.position.y };
    this.gameMap.ctx.drawImage(this.texture, this.position.x, this.position.y);
    this.gameMap.ctx.drawImage(
      this.weapon.texture,
      this.position.x + 50,
      this.position.y
    );
  }

  attack() {
    if (!this.died) {
      return this.weapon.attack();
    }
  }

  changeWeapon(weapon: IWeapon) {}
}
