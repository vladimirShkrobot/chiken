"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
class GameMap {
    constructor({ character }) {
        this.mobs = [];
        this.character = character;
        this.spawnCharacter();
    }
    spawnCharacter() {
        this.character.texture.onload = () => {
            ctx.drawImage(this.character.texture, this.character.position.x, this.character.position.y);
        };
    }
    spawnMob(mob) {
        this.mobs.push(mob);
        mob.texture.onload = () => {
            ctx.drawImage(mob.texture, mob.position.x, mob.position.y);
            mob.move(this.character);
        };
    }
    killMob(index) {
        const [mob] = this.mobs.splice(index, 1);
        mob.die();
    }
}
class Character {
    constructor({ position, img, weapon }) {
        this.position = position;
        this.texture = new Image();
        this.texture.src = img;
        this.weapon = weapon;
        this.attacking = false;
        this.died = false;
        this.drawWeapon();
        this.weapon.position = { x: this.position.x + 50, y: this.position.y };
    }
    drawWeapon(type, characteristics) {
        this.weapon.texture.onload = () => {
            ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
        };
    }
    die() {
        this.died = true;
        ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
    }
    move(direction) {
        if (this.attacking || this.died) {
            return;
        }
        const moveDistance = 10;
        if (direction === 'ArrowLeft') {
            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
            this.position.x -= moveDistance;
        }
        else if (direction === 'ArrowRight') {
            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
            this.position.x += moveDistance;
        }
        else if (direction === 'ArrowUp') {
            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
            this.position.y -= moveDistance;
        }
        else if (direction === 'ArrowDown') {
            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);
            this.position.y += moveDistance;
        }
        else {
            return;
        }
        ctx.drawImage(this.texture, this.position.x, this.position.y);
        this.weapon.position = { x: this.position.x + 50, y: this.position.y };
        ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);
    }
    attack(mobs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.died) {
                return yield this.weapon.attack(mobs);
            }
            return Promise.resolve(false);
        });
    }
    changeWeapon(weapon) {
    }
}
class Mob {
    constructor({ position, speed }) {
        this.position = position;
        this.speed = speed;
        this.texture = new Image();
        this.died = false;
    }
    die() {
        this.died = true;
    }
    move(enemy) {
        const drawMob = () => {
            // ctx.clearRect(this.position.x + this.speed, this.position.y, 80, 53); // Очистить холст
            ctx.drawImage(this.texture, this.position.x, this.position.y);
        };
        const animate = () => {
            ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);
            if (enemy.position.x < this.position.x) {
                this.position.x -= this.speed;
            }
            else {
                this.position.x += this.speed;
            }
            if (enemy.position.y < this.position.y) {
                this.position.y -= this.speed;
            }
            else {
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
                }, 15);
            }
            else {
                ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);
            }
        };
        animate();
    }
}
class Fish extends Mob {
    constructor({ position, speed }) {
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
document.addEventListener('keydown', (event) => __awaiter(void 0, void 0, void 0, function* () {
    character.move(event.key);
    if (event.key === 'x') {
        const mob = yield character.attack(mainMap.mobs);
        if (mob) {
            const [_, mobInded] = mob;
            mainMap.killMob(mobInded);
        }
    }
}));
let spawnTime = 3000;
setInterval(() => {
    spawnTime = spawnTime - spawnTime / 10;
}, 10000);
setInterval(() => {
    const mob = new Fish({
        position: {
            x: Math.floor(Math.random() * (1920 - 960 + 1)) + 960,
            y: Math.floor(Math.random() * 1081)
        },
        speed: 1,
    });
    mainMap.spawnMob(mob);
}, spawnTime);
