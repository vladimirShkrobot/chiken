const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
// ctx.fillStyle = 'gray';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

interface IWeapon {
  dmg: number
  range: number
  texture: HTMLImageElement
  attack: () => void
}

class GameMap {
  mobs: Mob[];
  Character: Character
  constructor({ Character }: { Character: { new(...args: any[]): Character } }) {
    this.mobs = [];
    this.Character = new Character({
      img: './images/character.png',
      position: {
        x: canvas.width / 2,
        y: canvas.height / 2
      },
      Weapon: Gun,
      mobs: this.mobs
    });;
    this.spawnCharacter();

    document.addEventListener('keydown', (event) => {
      this.Character.move(event.key);
      if (event.key === 'x') {
        this.Character.attack();
      }
    });
  }

  private spawnCharacter() {
    this.Character.texture.onload = () => {
      ctx.drawImage(this.Character.texture, this.Character.position.x, this.Character.position.y);
    };
  }

  spawnMob(Mob: { new(arg: { position: { x: number, y: number }, enemy: Character, speed: number }): Mob }, position: { x: number, y: number }) {
    const mob = new Mob({
      position: {
        x: position.x || 900,
        y: position.y || 900
      },
      enemy: this.Character,
      speed: 1,

    });

    this.mobs.push(mob);
    mob.texture.onload = () => {
      ctx.drawImage(mob.texture, mob.position.x, mob.position.y);
      mob.move();
    };
  }
}

class Character {
  position: { x: number, y: number }
  texture: HTMLImageElement
  weapon: IWeapon
  mobs: Mob[]
  died: boolean
  private attacking: boolean

  constructor({ position, img, Weapon, mobs }: { position: { x: number, y: number }, img: string, Weapon: { new(arg: { range: number, dmg: number }): IWeapon }, mobs: Mob[] }) {
    this.position = position;
    this.texture = new Image();
    this.texture.src = img;
    this.mobs = mobs;
    this.weapon = new Weapon({ range: 50, dmg: 17, mobs });
    this.attacking = false;
    this.died = false
    this.drawWeapon();
  }

  private drawWeapon() {
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
    ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
  }

  attack() {
    if (this.died) {
      return
    }
    this.weapon.attack({ x: this.position.x + 50, y: this.position.y });
    // this.attacking = true
    // ctx.save();
    // ctx.translate(this.position.x + 50, this.position.y);
    // ctx.rotate(Math.PI / 4);
    // ctx.translate(-this.position.x + 50, -this.position.y);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(this.texture, this.position.x, this.position.y);
    // ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
    // ctx.restore();

    // setTimeout(() => {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   ctx.drawImage(this.texture, this.position.x, this.position.y);
    //   ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y)
    //   this.attacking = false
    // }, 250)
  }

  changeWeapon(weapon: IWeapon) {

  }
}

abstract class Weapon implements IWeapon {
  dmg: number
  range: number
  texture: HTMLImageElement
  protected mobs: Mob[]

  constructor({ dmg, range, mobs }: { dmg: number, range: number, mobs: Mob[] }) {
    this.dmg = dmg;
    this.range = range;
    this.texture = new Image();
    this.mobs = mobs;
  }



  abstract attack(): void
}

class Sword extends Weapon {
  attack() {

  }
}

class Gun extends Weapon {

  constructor({ dmg, range, mobs }: { dmg: number, range: number, mobs: Mob[] }) {
    super({ dmg, range, mobs });
    this.texture.src = './images/gun.png';
  }

  attack({ x: xP, y: yP }) {
    let x = xP + 150;
    const y = yP + 10;
    const speed = 2;

    // Функция для рисования шарика
    function drawBall() {
      ctx.clearRect(x + speed - 50, y - 20, 40, 40); // Очистить холст
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    }

    // Функция анимации
    const animate = () => {
      x += speed; // Увеличиваем координату x на значение скорости
      drawBall(); // Рисуем шарик
      const damagedMobIndex = this.mobs.findIndex(({ position, texture }) => {
        const halfOfMobWidth = texture.width / 2;
        const halfOfMobHeight = texture.height / 2;
        return (position.x - halfOfMobWidth < x && position.x + halfOfMobWidth > x) && (position.y - halfOfMobHeight < y && position.y + halfOfMobHeight + 40 > y);
      })
      if (damagedMobIndex > -1) {
        const [damagedMob] = this.mobs.splice(damagedMobIndex, 1);
        damagedMob.die();
        ctx.clearRect(x + speed - 22, y - 20, 40, 40);
        return
      }

      if (canvas.width > x || 0 > canvas.width) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(x + speed - 40, y - 20, 40, 40);
      }
    }

    // Запускаем анимацию
    animate();
  }
}

abstract class Mob {

  position: { x: number, y: number }
  enemy: Character
  speed: number
  texture: HTMLImageElement
  died: boolean

  constructor({ position, enemy, speed }: { position: { x: number, y: number }, enemy: Character, speed: number }) {
    this.position = position;
    this.enemy = enemy;
    this.speed = speed;
    this.texture = new Image();
    this.died = false
  }

  die() {
    this.died = true;
  }

  move() {
    const drawMob = () => {
      // ctx.clearRect(this.position.x + this.speed, this.position.y, 80, 53); // Очистить холст
      ctx.drawImage(this.texture, this.position.x, this.position.y);
    }

    const animate = () => {
      ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);
      if (this.enemy.position.x < this.position.x) {
        this.position.x -= this.speed;
      } else {
        this.position.x += this.speed;
      }

      if (this.enemy.position.y < this.position.y) {
        this.position.y -= this.speed;
      } else {
        this.position.y += this.speed;
      }

      const halfOfMobWidth = this.texture.width / 2;
      const halfOfMobHeight = this.texture.height / 2;
      if ((this.enemy.position.x - halfOfMobWidth < this.position.x && this.enemy.position.x + halfOfMobWidth > this.position.x) && (this.enemy.position.y - halfOfMobHeight < this.position.y && this.enemy.position.y + halfOfMobHeight > this.position.y)) {
        this.enemy.die();
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
  constructor({ position, enemy, speed }: { position: { x: number, y: number }, enemy: Character, speed: number }) {
    super({ position, enemy, speed });
    this.texture.src = './images/fish.jpg';
  }
}

const mainMap = new GameMap({ Character });
// mainMap.spawnMob(Fish, { x: 1800, y: Math.floor(Math.random() * 1081) });

let spawnTime = 3000;

setInterval(() => {
  spawnTime = spawnTime - spawnTime / 10;
}, 10000)

setInterval(() => {
  mainMap.spawnMob(Fish, { x: Math.floor(Math.random() * (1920 - 960 + 1)) + 960, y: Math.floor(Math.random() * 1081) });
}, spawnTime)