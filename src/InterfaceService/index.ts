import { GameMap } from "../Maps";

export default class InterfaceService {
  constructor(private gameMap: GameMap) {
    this.renderBulletsCount();
    this.gameMap.observer.on("characterTakesBullets", this.renderBulletsCount);
    this.gameMap.observer.on("weaponAttack", this.renderBulletsCount);
  }

  renderBulletsCount = () => {
    const bulletCountNode = document.getElementById("bulletCount")!;
    const { bulletCount } = this.gameMap.character.weapon;
    bulletCountNode.innerText = `${bulletCount}`;
  };
}
