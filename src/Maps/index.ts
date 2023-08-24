import { Character } from "../Characters";
import { Mob } from "../Mobs";
import Observer from "../Observer";

export class GameMap {
  observer: Observer;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mobs: Mob[];
  charactersBullets: any[];
  character: Character = null as unknown as Character;
  constructor() {
    this.observer = new Observer();
    this.canvas = document.querySelector("#myCanvas")!;
    this.ctx = this.canvas.getContext("2d")!;
    this.mobs = [];
    this.charactersBullets = [];
    this.renderMap();
  }

  private renderMap() {
    const background = document.getElementById("background")!;
    const bulletCountNode = document.getElementById("bulletCount")!;
    background.style.width = window.innerWidth + "px";
    background.style.height = window.innerHeight + "px";
    this.canvas.style.border = "0";
    this.canvas.width = window.innerWidth - 5;
    this.canvas.height = window.innerHeight - 5;
    // this.ctx.fillStyle = 'gray';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // bulletCountNode.innerText = `${character.weapon.bulletCount}`;
  }

  spawnCharacter(character: Character) {
    this.character = character;
    this.character.texture.onload = () => {
      this.ctx.drawImage(
        this.character.texture,
        this.character.position.x,
        this.character.position.y
      );
    };
  }

  spawnMob(mob: Mob) {
    this.mobs.push(mob);
    mob.texture.onload = () => {
      this.ctx.drawImage(mob.texture, mob.position.x, mob.position.y);
    };
  }

  killMob(index: number) {
    const [mob] = this.mobs.splice(index, 1);
    mob.die();
  }

  characterBulletRegistration(bullet: any) {
    const bulletIndex = this.charactersBullets.push(bullet) - 1;
    return () => {
      this.charactersBullets.splice(bulletIndex, 1);
    };
  }
}
