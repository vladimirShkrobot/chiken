import { Character } from "./Characters";
import { GameMap } from "./Maps";
import { MobFactory } from "./Mobs";
import { WeaponFactory } from "./Weapons";

const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
const background = document.getElementById('background')!;
const bulletCountNode = document.getElementById('bulletCount')!;
background.style.width = window.innerWidth + 'px';
background.style.height = window.innerHeight + 'px';
canvas.style.border = '0'
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;
// ctx.fillStyle = 'gray';
// ctx.fillRect(0, 0, canvas.width, canvas.height);


const weaponFactory = new WeaponFactory();
const mobFactory = new MobFactory();
const gun = weaponFactory.create({ type: 'Gun', range: 50, dmg: 17 });
const character = new Character({
  img: './images/character.png',
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2
  },
  weapon: gun
});
const mainMap = new GameMap({ character });

bulletCountNode.innerText = `${character.weapon.bulletCount}`;

const moveIntervals: {
  left: NodeJS.Timer | null
  right: NodeJS.Timer | null
  up: NodeJS.Timer | null
  down: NodeJS.Timer | null
} = {
  left: null,
  right: null,
  up: null,
  down: null
}

document.addEventListener('keydown', async (event) => {
  if (event.repeat) {
    return;
  }
  switch (event.key) {
    case 'ArrowLeft':
      if (moveIntervals.left !== null) {
        clearInterval(moveIntervals.left);
      }
      moveIntervals.left = setInterval(() => {
        character.move('left');
      }, 33)
      break;
    case 'ArrowRight':
      if (moveIntervals.right !== null) {
        clearInterval(moveIntervals.right);
      }
      moveIntervals.right = setInterval(() => {
        character.move('right');
      }, 33)
      break;
    case 'ArrowUp':
      if (moveIntervals.up !== null) {
        clearInterval(moveIntervals.up);
      }
      moveIntervals.up = setInterval(() => {
        character.move('up');
      }, 33)
      break;
    case 'ArrowDown':
      if (moveIntervals.down !== null) {
        clearInterval(moveIntervals.down);
      }
      moveIntervals.down = setInterval(() => {
        character.move('down');
      }, 33)
      break;
  }

  if (event.key === 'x') {
    character.attack(mainMap.mobs).then(isMob => {
      if (isMob) {
        const [mob, mobIndex] = isMob;
        mob.hp -= character.weapon.dmg;
        if (mob.hp < 0) {
          mainMap.killMob(mobIndex);
          if (mob.drop.bullets) {
            character.weapon.bulletCount += mob.drop.bullets;
            bulletCountNode.innerText = `${character.weapon.bulletCount}`;
          }
        }
      }
    })
    bulletCountNode.innerText = `${character.weapon.bulletCount}`;
  }
});

document.addEventListener('keyup', function (event) {
  switch (event.key) {
    case 'ArrowLeft':
      if (moveIntervals.left !== null) {
        clearInterval(moveIntervals.left);
      }
      break;
    case 'ArrowRight':
      if (moveIntervals.right !== null) {
        clearInterval(moveIntervals.right);
      }
      break;
    case 'ArrowUp':
      if (moveIntervals.up !== null) {
        clearInterval(moveIntervals.up);
      }
      break;
    case 'ArrowDown':
      if (moveIntervals.down !== null) {
        clearInterval(moveIntervals.down);
      }
      break;
  }
});

let spawnTime = 3000;
setInterval(() => {
  spawnTime = spawnTime - spawnTime / 10;
}, 10000)

setInterval(() => {
  const mob = mobFactory.createRandomWithRandomPosition({
    speed: 1,
  });
  mainMap.spawnMob(mob);
}, spawnTime)
