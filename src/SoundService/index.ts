import { GameMap } from "../Maps";

export default class SoundService {
  private gunShotSound: HTMLAudioElement;
  private backgroundSound: HTMLAudioElement;

  constructor(private gameMap: GameMap) {
    this.gunShotSound = new Audio("./sounds/gunShot.mp3");
    this.backgroundSound = new Audio("./sounds/tripok.ogg");

    this.background();
    this.subscribe();
  }

  gunShot = () => {
    this.playSound(this.gunShotSound);
  };

  background = () => {
    this.playSound(this.backgroundSound, 0.3);
  };

  private playSound(sound: HTMLAudioElement, volume: number = 0.5) {
    console.log(volume)
    sound.currentTime = 0;
    sound.volume = volume;
    sound.play();
  }

  private subscribe() {
    this.gameMap.observer.on("weaponAttack", this.gunShot);
  }
}
