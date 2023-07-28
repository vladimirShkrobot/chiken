abstract class Weapon implements IWeapon {
  dmg: number
  range: number
  texture: HTMLImageElement
  position?: { x: number; y: number; };

  constructor({ dmg, range }: { dmg: number, range: number }) {
    this.dmg = dmg;
    this.range = range;
    this.texture = new Image();
  }

  abstract attack(mobs: Mob[]): Promise<false | [Mob, number]>
}

// class Sword extends Weapon {
//   attack() {

//   }
// }

class Gun extends Weapon {

  constructor({ dmg, range }: { dmg: number, range: number }) {
    super({ dmg, range });
    this.texture.src = './images/gun.png';
  }

  attack(mobs: Mob[]) {
    return new Promise<false | [Mob, number]>(resolve => {
      if (!this.position) {
        return resolve(false);
      }
      let x = this.position.x + 150;
      const y = this.position.y + 10;
      const speed = 2;

      // Функция для рисования шарика
      const drawBall = () => {
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
        const damagedMobIndex = mobs.findIndex(({ position, texture }) => {
          const halfOfMobWidth = texture.width / 2;
          const halfOfMobHeight = texture.height / 2;
          return (position.x - halfOfMobWidth < x && position.x + halfOfMobWidth > x) && (position.y - halfOfMobHeight < y && position.y + halfOfMobHeight + 40 > y);
        })
        if (damagedMobIndex > -1) {
          ctx.clearRect(x + speed - 22, y - 20, 40, 40);
          return resolve([mobs[damagedMobIndex], damagedMobIndex]);
        }

        if (canvas.width > x || 0 > canvas.width) {
          requestAnimationFrame(animate);
        } else {
          ctx.clearRect(x + speed - 40, y - 20, 40, 40);
          return resolve(false);
        }
      }

      // Запускаем анимацию
      animate();
    })
  }
}

enum Weapons {
  gun
}

class WeaponFactory {

  static list: { [key in keyof typeof Weapons]: typeof Gun } = {
    gun: Gun
  }

  create(type: keyof typeof Weapons, characteristics: IWeapon) {
    return new WeaponFactory.list[type](characteristics);
  }
}