/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Characters/index.ts":
/*!*********************************!*\
  !*** ./src/Characters/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Character: () => (/* binding */ Character)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nclass Character {\n    constructor({ position, img, weapon }, gameMap) {\n        this.gameMap = gameMap;\n        this.position = position;\n        this.texture = new Image();\n        this.texture.src = img;\n        this.attacking = false;\n        this.died = false;\n        this.weapon = weapon;\n        this.takeWeapon();\n        this.control();\n        this.gameMap.observer.on(\"mobDie\", (mob) => {\n            if (mob.drop.bullets) {\n                this.weapon.bulletCount += mob.drop.bullets;\n                this.gameMap.observer.fire(\"characterTakesBullets\", mob.drop.bullets);\n            }\n        });\n    }\n    control() {\n        const moveIntervals = {\n            left: null,\n            right: null,\n            up: null,\n            down: null,\n        };\n        document.addEventListener(\"keydown\", (event) => __awaiter(this, void 0, void 0, function* () {\n            if (event.repeat) {\n                return;\n            }\n            switch (event.key) {\n                case \"ArrowLeft\":\n                    if (moveIntervals.left !== null) {\n                        clearInterval(moveIntervals.left);\n                    }\n                    moveIntervals.left = setInterval(() => {\n                        this.move(\"left\");\n                    }, 33);\n                    break;\n                case \"ArrowRight\":\n                    if (moveIntervals.right !== null) {\n                        clearInterval(moveIntervals.right);\n                    }\n                    moveIntervals.right = setInterval(() => {\n                        this.move(\"right\");\n                    }, 33);\n                    break;\n                case \"ArrowUp\":\n                    if (moveIntervals.up !== null) {\n                        clearInterval(moveIntervals.up);\n                    }\n                    moveIntervals.up = setInterval(() => {\n                        this.move(\"up\");\n                    }, 33);\n                    break;\n                case \"ArrowDown\":\n                    if (moveIntervals.down !== null) {\n                        clearInterval(moveIntervals.down);\n                    }\n                    moveIntervals.down = setInterval(() => {\n                        this.move(\"down\");\n                    }, 33);\n                    break;\n            }\n            if (event.key === \"x\") {\n                this.attack();\n            }\n        }));\n        document.addEventListener(\"keyup\", function (event) {\n            switch (event.key) {\n                case \"ArrowLeft\":\n                    if (moveIntervals.left !== null) {\n                        clearInterval(moveIntervals.left);\n                    }\n                    break;\n                case \"ArrowRight\":\n                    if (moveIntervals.right !== null) {\n                        clearInterval(moveIntervals.right);\n                    }\n                    break;\n                case \"ArrowUp\":\n                    if (moveIntervals.up !== null) {\n                        clearInterval(moveIntervals.up);\n                    }\n                    break;\n                case \"ArrowDown\":\n                    if (moveIntervals.down !== null) {\n                        clearInterval(moveIntervals.down);\n                    }\n                    break;\n            }\n        });\n    }\n    takeWeapon() {\n        this.weapon.position = { x: this.position.x + 50, y: this.position.y };\n        this.weapon.texture.onload = () => {\n            this.gameMap.ctx.drawImage(this.weapon.texture, this.weapon.position.x, this.weapon.position.y);\n        };\n    }\n    drawWeapon(weapon) {\n        this.weapon = weapon;\n        this.takeWeapon();\n        return weapon;\n    }\n    die() {\n        this.died = true;\n        this.gameMap.ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n    }\n    move(direction) {\n        if (this.attacking || this.died) {\n            return;\n        }\n        const moveDistance = 10;\n        if (direction === \"left\") {\n            this.gameMap.ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.x -= moveDistance;\n        }\n        else if (direction === \"right\") {\n            this.gameMap.ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.x += moveDistance;\n        }\n        else if (direction === \"up\") {\n            this.gameMap.ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.y -= moveDistance;\n        }\n        else if (direction === \"down\") {\n            this.gameMap.ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.y += moveDistance;\n        }\n        else {\n            return;\n        }\n        this.weapon.position = { x: this.position.x + 50, y: this.position.y };\n        this.gameMap.ctx.drawImage(this.texture, this.position.x, this.position.y);\n        this.gameMap.ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);\n    }\n    attack() {\n        if (!this.died) {\n            return this.weapon.attack();\n        }\n    }\n    changeWeapon(weapon) { }\n}\n\n\n//# sourceURL=webpack://rpg/./src/Characters/index.ts?");

/***/ }),

/***/ "./src/InterfaceService/index.ts":
/*!***************************************!*\
  !*** ./src/InterfaceService/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InterfaceService)\n/* harmony export */ });\nclass InterfaceService {\n    constructor(gameMap) {\n        this.gameMap = gameMap;\n        this.renderBulletsCount = () => {\n            const bulletCountNode = document.getElementById(\"bulletCount\");\n            const { bulletCount } = this.gameMap.character.weapon;\n            bulletCountNode.innerText = `${bulletCount}`;\n        };\n        this.renderBulletsCount();\n        this.gameMap.observer.on(\"characterTakesBullets\", this.renderBulletsCount);\n        this.gameMap.observer.on(\"weaponAttack\", this.renderBulletsCount);\n    }\n}\n\n\n//# sourceURL=webpack://rpg/./src/InterfaceService/index.ts?");

/***/ }),

/***/ "./src/Maps/index.ts":
/*!***************************!*\
  !*** ./src/Maps/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameMap: () => (/* binding */ GameMap)\n/* harmony export */ });\n/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observer */ \"./src/Observer/index.ts\");\n\nclass GameMap {\n    constructor() {\n        this.character = null;\n        this.observer = new _Observer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.canvas = document.querySelector(\"#myCanvas\");\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.mobs = [];\n        this.charactersBullets = [];\n        this.renderMap();\n    }\n    renderMap() {\n        const background = document.getElementById(\"background\");\n        const bulletCountNode = document.getElementById(\"bulletCount\");\n        background.style.width = window.innerWidth + \"px\";\n        background.style.height = window.innerHeight + \"px\";\n        this.canvas.style.border = \"0\";\n        this.canvas.width = window.innerWidth - 5;\n        this.canvas.height = window.innerHeight - 5;\n        // this.ctx.fillStyle = 'gray';\n        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        // bulletCountNode.innerText = `${character.weapon.bulletCount}`;\n    }\n    spawnCharacter(character) {\n        this.character = character;\n        this.character.texture.onload = () => {\n            this.ctx.drawImage(this.character.texture, this.character.position.x, this.character.position.y);\n        };\n    }\n    spawnMob(mob) {\n        this.mobs.push(mob);\n        mob.texture.onload = () => {\n            this.ctx.drawImage(mob.texture, mob.position.x, mob.position.y);\n        };\n    }\n    killMob(index) {\n        const [mob] = this.mobs.splice(index, 1);\n        mob.die();\n    }\n    characterBulletRegistration(bullet) {\n        const bulletIndex = this.charactersBullets.push(bullet) - 1;\n        return () => {\n            this.charactersBullets.splice(bulletIndex, 1);\n        };\n    }\n}\n\n\n//# sourceURL=webpack://rpg/./src/Maps/index.ts?");

/***/ }),

/***/ "./src/Mobs/index.ts":
/*!***************************!*\
  !*** ./src/Mobs/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Chestnut: () => (/* binding */ Chestnut),\n/* harmony export */   Cow: () => (/* binding */ Cow),\n/* harmony export */   Fish: () => (/* binding */ Fish),\n/* harmony export */   Mob: () => (/* binding */ Mob),\n/* harmony export */   MobFactory: () => (/* binding */ MobFactory)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\n\nclass Mob {\n    constructor({ position, speed, type, drop }, gameMap) {\n        this.takeDmg = ({ attack, hit, }) => {\n            const halfOfMobWidth = this.texture.width / 2;\n            const halfOfMobHeight = this.texture.height / 2;\n            if (this.position.x - halfOfMobWidth < attack.position.x &&\n                this.position.x + halfOfMobWidth > attack.position.x &&\n                this.position.y - halfOfMobHeight < attack.position.y &&\n                this.position.y + halfOfMobHeight + 40 > attack.position.y) {\n                hit();\n                this.hp -= attack.dmg;\n                if (this.hp < 1) {\n                    this.die();\n                }\n            }\n        };\n        this.gameMap = gameMap;\n        this.position = position;\n        this.speed = speed;\n        this.texture = new Image();\n        this.died = false;\n        this.type = type;\n        this.hp = 1;\n        this.drop = drop || {\n            bullets: 0,\n        };\n        this.gameMap.observer.on(\"bulletMove\", this.takeDmg);\n    }\n    die() {\n        this.gameMap.observer.off(\"bulletMove\", this.takeDmg);\n        this.died = true;\n        this.gameMap.observer.fire(\"mobDie\", this);\n    }\n    move(enemy) {\n        const drawMob = () => {\n            this.gameMap.ctx.drawImage(this.texture, this.position.x, this.position.y);\n        };\n        const animate = () => {\n            this.gameMap.ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);\n            if (enemy.position.x < this.position.x) {\n                this.position.x -= this.speed;\n            }\n            else {\n                this.position.x += this.speed;\n            }\n            if (enemy.position.y < this.position.y) {\n                this.position.y -= this.speed;\n            }\n            else {\n                this.position.y += this.speed;\n            }\n            const halfOfMobWidth = this.texture.width / 2;\n            const halfOfMobHeight = this.texture.height / 2;\n            if (enemy.position.x - halfOfMobWidth < this.position.x &&\n                enemy.position.x + halfOfMobWidth > this.position.x &&\n                enemy.position.y - halfOfMobHeight < this.position.y &&\n                enemy.position.y + halfOfMobHeight > this.position.y) {\n                enemy.die();\n            }\n            drawMob();\n            if (!this.died) {\n                setTimeout(() => {\n                    requestAnimationFrame(animate);\n                }, 15);\n            }\n            else {\n                this.gameMap.ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);\n            }\n        };\n        animate();\n    }\n}\nclass Fish extends Mob {\n    constructor(characteristics, gameMap) {\n        super(characteristics, gameMap);\n        this.texture.src = \"./images/fish.png\";\n        this.drop = {\n            bullets: 1,\n        };\n    }\n}\nclass Chestnut extends Mob {\n    constructor(characteristics, gameMap) {\n        super(characteristics, gameMap);\n        this.texture.src = \"./images/chestnut.png\";\n        this.hp = 100;\n        this.drop = {\n            bullets: 7,\n        };\n    }\n}\nclass Cow extends Mob {\n    constructor(characteristics, gameMap) {\n        super(characteristics, gameMap);\n        this.texture.src = \"./images/cow.png\";\n        this.hp = 1000;\n    }\n}\nclass MobFactory {\n    create(characteristics, gameMap) {\n        return new MobFactory.list[characteristics.type](characteristics, gameMap);\n    }\n    createRandom(characteristics, gameMap) {\n        const mobNames = Object.keys(MobFactory.list);\n        const randomMobIndex = Math.floor(Math.random() * mobNames.length);\n        const partialCharacteristics = characteristics;\n        partialCharacteristics.type = mobNames[randomMobIndex];\n        return new MobFactory.list[partialCharacteristics.type](partialCharacteristics, gameMap);\n    }\n    createRandomWithRandomPosition(characteristics, gameMap) {\n        const partialCharacteristics = characteristics;\n        partialCharacteristics.position =\n            this.calculateRandomBehindScreenPosition();\n        const randomMob = this.createRandom(partialCharacteristics, gameMap);\n        return randomMob;\n    }\n    calculateRandomBehindScreenPosition() {\n        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(0, 1)) {\n            return {\n                x: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(-100, window.innerWidth + 100),\n                y: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(0, 1) ? -100 : window.innerHeight + 100,\n            };\n        }\n        else {\n            return {\n                x: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(0, 1) ? -100 : window.innerWidth + 100,\n                y: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(-100, window.innerHeight + 100),\n            };\n        }\n    }\n}\nMobFactory.list = {\n    Fish,\n    Chestnut,\n    // Cow\n};\n\n\n//# sourceURL=webpack://rpg/./src/Mobs/index.ts?");

/***/ }),

/***/ "./src/Observer/index.ts":
/*!*******************************!*\
  !*** ./src/Observer/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Observer)\n/* harmony export */ });\nclass Observer {\n    constructor() {\n        this.eventListeners = {};\n        if (Observer.instance) {\n            return Observer.instance;\n        }\n        Observer.instance = this;\n    }\n    on(eventName, handler) {\n        if (!this.eventListeners[eventName]) {\n            this.eventListeners[eventName] = [];\n        }\n        this.eventListeners[eventName].push(handler);\n    }\n    off(eventName, handler) {\n        if (this.eventListeners[eventName]) {\n            this.eventListeners[eventName] = this.eventListeners[eventName].filter(h => h !== handler);\n        }\n    }\n    fire(eventName, ...args) {\n        const handlers = this.eventListeners[eventName];\n        if (handlers) {\n            for (const handler of handlers) {\n                handler(...args);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://rpg/./src/Observer/index.ts?");

/***/ }),

/***/ "./src/SoundService/index.ts":
/*!***********************************!*\
  !*** ./src/SoundService/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SoundService)\n/* harmony export */ });\nclass SoundService {\n    constructor(gameMap) {\n        this.gameMap = gameMap;\n        this.gunShot = () => {\n            this.playSound(this.gunShotSound);\n        };\n        this.background = () => {\n            this.playSound(this.backgroundSound, 0.3);\n        };\n        this.gunShotSound = new Audio(\"./sounds/gunShot.mp3\");\n        this.backgroundSound = new Audio(\"./sounds/tripok.ogg\");\n        this.background();\n        this.subscribe();\n    }\n    playSound(sound, volume = 0.5) {\n        console.log(volume);\n        sound.currentTime = 0;\n        sound.volume = volume;\n        sound.play();\n    }\n    subscribe() {\n        this.gameMap.observer.on(\"weaponAttack\", this.gunShot);\n    }\n}\n\n\n//# sourceURL=webpack://rpg/./src/SoundService/index.ts?");

/***/ }),

/***/ "./src/Weapons/index.ts":
/*!******************************!*\
  !*** ./src/Weapons/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gun: () => (/* binding */ Gun),\n/* harmony export */   WeaponFactory: () => (/* binding */ WeaponFactory)\n/* harmony export */ });\nclass Weapon {\n    constructor({ dmg, range, type, position }, gameMap) {\n        this.gameMap = gameMap;\n        this.dmg = dmg;\n        this.range = range;\n        this.texture = new Image();\n        this.position = position || { x: NaN, y: NaN };\n        this.type = type;\n    }\n}\n// class Sword extends Weapon {\n//   attack() {\n//   }\n// }\nclass Gun extends Weapon {\n    constructor(weaponCharacteristics, gameMap) {\n        super(weaponCharacteristics, gameMap);\n        this.texture.src = \"./images/gun.png\";\n        this.bulletCount = 7;\n        this.bullet = {\n            texture: new Image(),\n        };\n        this.bullet.texture.src = \"./images/bullet.png\";\n    }\n    attack() {\n        const bullet = {\n            position: {\n                x: this.position.x + 150,\n                y: this.position.y - 5,\n            },\n            speed: 2,\n        };\n        if (!this.bulletCount) {\n            return;\n        }\n        return {\n            bullet,\n            result: new Promise(resolve => {\n                // let x = this.position.x + 150;\n                // const y = this.position.y - 5;\n                // const speed = 2;\n                const drawBall = () => {\n                    // ctx.clearRect(x + speed - 50, y - 20, 40, 40);\n                    // ctx.beginPath();\n                    // ctx.arc(x, y, 20, 0, Math.PI * 2);\n                    // ctx.fillStyle = 'blue';\n                    // ctx.fill();\n                    // ctx.closePath();\n                    this.gameMap.ctx.clearRect(bullet.position.x + bullet.speed - 50, bullet.position.y - 10, 40, 40);\n                    this.gameMap.ctx.drawImage(this.bullet.texture, bullet.position.x, bullet.position.y);\n                };\n                const animate = () => {\n                    bullet.position.x += bullet.speed;\n                    let hit = false;\n                    drawBall();\n                    // const damagedMobIndex = mobs.findIndex(({ position, texture }) => {\n                    //   const halfOfMobWidth = texture.width / 2;\n                    //   const halfOfMobHeight = texture.height / 2;\n                    //   return (\n                    //     position.x - halfOfMobWidth < bullet.position.x &&\n                    //     position.x + halfOfMobWidth > bullet.position.x &&\n                    //     position.y - halfOfMobHeight < bullet.position.y &&\n                    //     position.y + halfOfMobHeight + 40 > bullet.position.y\n                    //   );\n                    // });\n                    // if (damagedMobIndex > -1) {\n                    //   ctx.clearRect(\n                    //     bullet.position.x + bullet.speed - 20,\n                    //     bullet.position.y,\n                    //     60,\n                    //     40\n                    //   );\n                    //   return resolve([mobs[damagedMobIndex], damagedMobIndex]);\n                    // }\n                    // if (canvas.width > bullet.position.x || 0 > canvas.width) {\n                    //   requestAnimationFrame(animate);\n                    // } else {\n                    //   ctx.clearRect(\n                    //     bullet.position.x + bullet.speed - 40,\n                    //     bullet.position.y - 10,\n                    //     40,\n                    //     40\n                    //   );\n                    //   return resolve(false);\n                    // }\n                    this.gameMap.observer.fire(\"bulletMove\", {\n                        attack: {\n                            position: {\n                                x: bullet.position.x,\n                                y: bullet.position.y,\n                            },\n                            dmg: this.dmg,\n                        },\n                        hit: () => {\n                            hit = true;\n                        },\n                    });\n                    if (!hit &&\n                        (this.gameMap.canvas.width > bullet.position.x ||\n                            0 > this.gameMap.canvas.width)) {\n                        requestAnimationFrame(animate);\n                    }\n                    else {\n                        this.gameMap.ctx.clearRect(bullet.position.x + bullet.speed - 20, bullet.position.y - 5, 60, 40);\n                    }\n                };\n                animate();\n                this.bulletCount--;\n                this.gameMap.observer.fire(\"weaponAttack\");\n            }),\n        };\n    }\n}\nclass WeaponFactory {\n    create(characteristics, gameMap) {\n        return new WeaponFactory.list[characteristics.type](characteristics, gameMap);\n    }\n}\nWeaponFactory.list = {\n    Gun,\n};\n\n\n//# sourceURL=webpack://rpg/./src/Weapons/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Characters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Characters */ \"./src/Characters/index.ts\");\n/* harmony import */ var _InterfaceService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InterfaceService */ \"./src/InterfaceService/index.ts\");\n/* harmony import */ var _Maps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Maps */ \"./src/Maps/index.ts\");\n/* harmony import */ var _Mobs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Mobs */ \"./src/Mobs/index.ts\");\n/* harmony import */ var _SoundService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SoundService */ \"./src/SoundService/index.ts\");\n/* harmony import */ var _Weapons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Weapons */ \"./src/Weapons/index.ts\");\n\n\n\n\n\n\nconst startGameScreen = document.querySelector(\"#startGameScreen\");\nconst startGameButton = document.querySelector(\"#startGameButton\");\nfunction startGame() {\n    const gameMap = new _Maps__WEBPACK_IMPORTED_MODULE_2__.GameMap();\n    const weaponFactory = new _Weapons__WEBPACK_IMPORTED_MODULE_5__.WeaponFactory();\n    const mobFactory = new _Mobs__WEBPACK_IMPORTED_MODULE_3__.MobFactory();\n    const gun = weaponFactory.create({ type: \"Gun\", range: 50, dmg: 17 }, gameMap);\n    const character = new _Characters__WEBPACK_IMPORTED_MODULE_0__.Character({\n        img: \"./images/character.png\",\n        position: {\n            x: gameMap.canvas.width / 2,\n            y: gameMap.canvas.height / 2,\n        },\n        weapon: gun,\n    }, gameMap);\n    gameMap.spawnCharacter(character);\n    new _InterfaceService__WEBPACK_IMPORTED_MODULE_1__[\"default\"](gameMap);\n    new _SoundService__WEBPACK_IMPORTED_MODULE_4__[\"default\"](gameMap);\n    let spawnTime = 3000;\n    setInterval(() => {\n        spawnTime = spawnTime - spawnTime / 10;\n    }, 10000);\n    setInterval(() => {\n        const mob = mobFactory.createRandomWithRandomPosition({\n            speed: 1,\n        }, gameMap);\n        gameMap.spawnMob(mob);\n        mob.move(character);\n    }, spawnTime);\n}\nstartGameButton.addEventListener(\"click\", () => {\n    startGame();\n    startGameScreen.remove();\n});\n\n\n//# sourceURL=webpack://rpg/./src/index.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRandomNumber: () => (/* binding */ getRandomNumber)\n/* harmony export */ });\nfunction getRandomNumber(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n\n//# sourceURL=webpack://rpg/./src/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;