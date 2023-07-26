const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
// ctx.fillStyle = 'gray';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

interface IWeapon {
  dmg: number
  range: number
  texture: HTMLImageElement,
  attack: () => void
}

class GameMap {
  spawnCharacter(character: Character) {
    character.texture.onload = function () {
      ctx.drawImage(character.texture, character.position.x, character.position.y);
    };
  }
}

class Character {
  position: { x: number, y: number }
  texture: HTMLImageElement
  weapon: IWeapon
  private attacking: boolean

  constructor({ position, img, weapon }: { position: { x: number, y: number }, img: string, weapon: IWeapon }) {
    this.position = position;
    this.texture = new Image();
    this.texture.src = img;
    this.weapon = weapon;
    this.attacking = false;
    this.drawWeapon();
  }

  private drawWeapon() {
    this.weapon.texture.onload = () => {
      ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
    };
  }

  move(direction: string) {
    if (this.attacking) {
      return
    }
    const moveDistance = 10;
    ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
    if (direction === 'ArrowLeft') {
      this.position.x -= moveDistance;
    } else if (direction === 'ArrowRight') {
      this.position.x += moveDistance;
    } else if (direction === 'ArrowUp') {
      this.position.y -= moveDistance;
    } else if (direction === 'ArrowDown') {
      this.position.y += moveDistance;
    } else {
      return;
    }
    ctx.drawImage(this.texture, this.position.x, this.position.y);
    ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
  }

  attack() {

    this.attacking = true
    ctx.save();
    ctx.translate(this.position.x + 50, this.position.y);
    ctx.rotate(Math.PI / 4);
    ctx.translate(-this.position.x + 50, -this.position.y);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.texture, this.position.x, this.position.y);
    ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
    ctx.restore();

    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.texture, this.position.x, this.position.y);
      ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y)
      this.attacking = false
    }, 250)
  }

  changeWeapon(weapon: IWeapon) {

  }
}

abstract class Weapon implements IWeapon {
  dmg: number
  range: number
  texture: HTMLImageElement

  constructor({ dmg, range, img }: { dmg: number, range: number, img: string }) {
    this.dmg = dmg;
    this.range = range;
    this.texture = new Image();
    this.texture.src = img;
  }



  abstract attack(): void
}

class Sword extends Weapon {
  attack() {

  }
}


const sword = new Sword({
  dmg: 17,
  range: 50,
  img: './images/sword.png'
});
const character = new Character({
  img: './images/character.png',
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2
  },
  weapon: sword
});

// const sword2 = new Sword({
//   dmg: 17,
//   range: 50,
//   img: './images/sword.png'
// });
// const character2 = new Character({
//   img: './images/character.png',
//   position: {
//     x: 100,
//     y: 100
//   },
//   weapon: sword2
// });

const mainMap = new GameMap();
mainMap.spawnCharacter(character);
// mainMap.spawnCharacter(character2);

document.addEventListener('keydown', function (event) {
  character.move(event.key);
  if (event.key === 'x') {
    console.log(1)
    character.attack();
  }

  // if (event.key === 'a') {
  //   character2.move('ArrowLeft');
  // } else if (event.key === 'd') {
  //   character2.move('ArrowRight');
  // } else if (event.key === 'w') {
  //   character2.move('ArrowUp');
  // } else if (event.key === 's') {
  //   character2.move('ArrowDown');
  // }
});