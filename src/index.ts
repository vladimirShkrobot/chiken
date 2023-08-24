import { Character } from "./Characters";
import InterfaceService from "./InterfaceService";
import { GameMap } from "./Maps";
import { MobFactory } from "./Mobs";
import SoundService from "./SoundService";
import { WeaponFactory } from "./Weapons";
const startGameScreen = document.querySelector("#startGameScreen")!;
const startGameButton = document.querySelector("#startGameButton")!;

function startGame() {
  const gameMap = new GameMap();

  const weaponFactory = new WeaponFactory();
  const mobFactory = new MobFactory();

  const gun = weaponFactory.create(
    { type: "Gun", range: 50, dmg: 17 },
    gameMap
  );
  const character = new Character(
    {
      img: "./images/character.png",
      position: {
        x: gameMap.canvas.width / 2,
        y: gameMap.canvas.height / 2,
      },
      weapon: gun,
    },
    gameMap
  );
  gameMap.spawnCharacter(character);
  new InterfaceService(gameMap);
  new SoundService(gameMap);

  let spawnTime = 3000;
  setInterval(() => {
    spawnTime = spawnTime - spawnTime / 10;
  }, 10000);

  setInterval(() => {
    const mob = mobFactory.createRandomWithRandomPosition(
      {
        speed: 1,
      },
      gameMap
    );
    gameMap.spawnMob(mob);
    mob.move(character);
  }, spawnTime);
}

startGameButton.addEventListener("click", () => {
  startGame();
  startGameScreen.remove();
});
