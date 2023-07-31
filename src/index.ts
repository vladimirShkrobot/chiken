import { Character } from "./Characters";
import { GameMap } from "./Maps";
import { MobFactory } from "./Mobs";
import { WeaponFactory } from "./Weapons";

const canvas: HTMLCanvasElement = document.querySelector('#myCanvas')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
const background = document.getElementById('background')!;
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

document.addEventListener('keydown', async (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      character.move('left');
      break;
    case 'ArrowRight':
      character.move('right');
      break;
    case 'ArrowUp':
      character.move('up');
      break;
    case 'ArrowDown':
      character.move('down');
      break;
  }

  if (event.key === 'x') {
    const isMob = await character.attack(mainMap.mobs);
    if (isMob) {
      const [mob, mobIndex] = isMob;
      mob.hp -= character.weapon.dmg;
      if (mob.hp < 0) {
        mainMap.killMob(mobIndex);
      }
    }
  }
});


let spawnTime = 3000;
setInterval(() => {
  spawnTime = spawnTime - spawnTime / 10;
}, 10000)

setInterval(() => {
  const fish = mobFactory.createRandom({
    position: {
      x: Math.floor(Math.random() * (1920 - 960 + 1)) + 960,
      y: Math.floor(Math.random() * 1081)
    },
    speed: 1,
  });
  mainMap.spawnMob(fish);
}, spawnTime)
