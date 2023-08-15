import { Character } from "../Characters";
import { Mob } from "../Mobs";

const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

export class GameMap {
  mobs: Mob[];
  charactersBullets: any[]
  character: Character
  constructor({ character }: { character: Character }) {
    this.mobs = [];
    this.charactersBullets = []
    this.character = character;
    this.spawnCharacter();
  }

  private spawnCharacter() {
    this.character.texture.onload = () => {
      ctx.drawImage(this.character.texture, this.character.position.x, this.character.position.y);
    };
  }

  spawnMob(mob: Mob) {
    this.mobs.push(mob);
    mob.texture.onload = () => {
      ctx.drawImage(mob.texture, mob.position.x, mob.position.y);
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
    }
  }
}