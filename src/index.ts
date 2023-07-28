const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
// ctx.fillStyle = 'gray';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

interface IWeapon {
  dmg: number
  range: number
  texture: HTMLImageElement
  position?: IPosition
  attack: (mobs: Mob[]) => Promise<false | [Mob, number]>
}

interface IPosition {
  x: number
  y: number
}

class GameMap {
  mobs: Mob[];
  character: Character
  constructor({ character }: { character: Character }) {
    this.mobs = [];
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
      mob.move(this.character);
    };
  }

  killMob(index: number) {
    const [mob] = this.mobs.splice(index, 1);
    mob.die();
  }
}

class Character {
  position: IPosition
  texture: HTMLImageElement
  weapon: IWeapon
  died: boolean
  private attacking: boolean

  constructor({ position, img, weapon }: { position: IPosition, img: string, weapon: IWeapon }) {
    this.position = position;
    this.texture = new Image();
    this.texture.src = img;
    this.weapon = weapon;
    this.attacking = false;
    this.died = false
    this.drawWeapon();
    this.weapon.position = { x: this.position.x + 50, y: this.position.y };
  }

  private drawWeapon(type, characteristics) {
    



    this.weapon.texture.onload = () => {
      ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
    };
  }

  die() {
    this.died = true
    ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
  }

  move(direction: string) {
    if (this.attacking || this.died) {
      return
    }
    const moveDistance = 10;
    if (direction === 'ArrowLeft') {
      ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
      this.position.x -= moveDistance;
    } else if (direction === 'ArrowRight') {
      ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
      this.position.x += moveDistance;
    } else if (direction === 'ArrowUp') {
      ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
      this.position.y -= moveDistance;
    } else if (direction === 'ArrowDown') {
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

abstract class Mob {

  position: IPosition
  speed: number
  texture: HTMLImageElement
  died: boolean

  constructor({ position, speed }: { position: IPosition, speed: number }) {
    this.position = position;
    this.speed = speed;
    this.texture = new Image();
    this.died = false
  }

  die() {
    this.died = true;
  }

  move(enemy: Character) {
    const drawMob = () => {
      // ctx.clearRect(this.position.x + this.speed, this.position.y, 80, 53); // Очистить холст
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

class Fish extends Mob {
  constructor({ position, speed }: { position: IPosition, speed: number }) {
    super({ position, speed });
    this.texture.src = './images/fish.jpg';
  }
}

// class MobFactory {
//   static list = {
//     fish: Fish
//   }

//   create(type, fields) {
    
//   }
// }


const gun = new Gun({ range: 50, dmg: 17 });
const character = new Character({
  img: './images/character.png',
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2
  },
  weapon: gun,
});
const mainMap = new GameMap({ character });

document.addEventListener('keydown', async (event) => {
  character.move(event.key);
  if (event.key === 'x') {
    const mob = await character.attack(mainMap.mobs);
    if (mob) {
      const [_, mobInded] = mob;
      mainMap.killMob(mobInded);
    }
  }
});


let spawnTime = 3000;
setInterval(() => {
  spawnTime = spawnTime - spawnTime / 10;
}, 10000)

setInterval(() => {
  const mob = new Fish({
    position: {
      x: Math.floor(Math.random() * (1920 - 960 + 1)) + 960,
      y: Math.floor(Math.random() * 1081)
    },
    speed: 1,
  });
  mainMap.spawnMob(mob);
}, spawnTime)
