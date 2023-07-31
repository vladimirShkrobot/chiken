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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Character: () => (/* binding */ Character)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst canvas = document.querySelector('#myCanvas');\nconst ctx = canvas.getContext('2d');\nclass Character {\n    constructor({ position, img, weapon }) {\n        this.position = position;\n        this.texture = new Image();\n        this.texture.src = img;\n        this.attacking = false;\n        this.died = false;\n        this.weapon = weapon;\n        this.takeWeapon();\n    }\n    takeWeapon() {\n        this.weapon.position = { x: this.position.x + 50, y: this.position.y };\n        this.weapon.texture.onload = () => {\n            ctx.drawImage(this.weapon.texture, this.weapon.position.x, this.weapon.position.y);\n        };\n    }\n    drawWeapon(weapon) {\n        this.weapon = weapon;\n        this.takeWeapon();\n        return weapon;\n    }\n    die() {\n        this.died = true;\n        ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n    }\n    move(direction) {\n        if (this.attacking || this.died) {\n            return;\n        }\n        const moveDistance = 10;\n        if (direction === 'left') {\n            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.x -= moveDistance;\n        }\n        else if (direction === 'right') {\n            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.x += moveDistance;\n        }\n        else if (direction === 'up') {\n            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.y -= moveDistance;\n        }\n        else if (direction === 'down') {\n            ctx.clearRect(this.position.x + 10, this.position.y, this.texture.width + this.weapon.texture.width - 30, this.weapon.texture.height);\n            this.position.y += moveDistance;\n        }\n        else {\n            return;\n        }\n        ctx.drawImage(this.texture, this.position.x, this.position.y);\n        this.weapon.position = { x: this.position.x + 50, y: this.position.y };\n        ctx.drawImage(this.weapon.texture, this.position.x + 50, this.position.y);\n    }\n    attack(mobs) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (!this.died) {\n                return yield this.weapon.attack(mobs);\n            }\n            return Promise.resolve(false);\n        });\n    }\n    changeWeapon(weapon) {\n    }\n}\n\n\n//# sourceURL=webpack://rpg/./src/Characters/index.ts?");

/***/ }),

/***/ "./src/Maps/index.ts":
/*!***************************!*\
  !*** ./src/Maps/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameMap: () => (/* binding */ GameMap)\n/* harmony export */ });\nconst canvas = document.querySelector('#myCanvas');\nconst ctx = canvas.getContext('2d');\nclass GameMap {\n    constructor({ character }) {\n        this.mobs = [];\n        this.character = character;\n        this.spawnCharacter();\n    }\n    spawnCharacter() {\n        this.character.texture.onload = () => {\n            ctx.drawImage(this.character.texture, this.character.position.x, this.character.position.y);\n        };\n    }\n    spawnMob(mob) {\n        this.mobs.push(mob);\n        mob.texture.onload = () => {\n            ctx.drawImage(mob.texture, mob.position.x, mob.position.y);\n            mob.move(this.character);\n        };\n    }\n    killMob(index) {\n        const [mob] = this.mobs.splice(index, 1);\n        mob.die();\n    }\n}\n\n\n//# sourceURL=webpack://rpg/./src/Maps/index.ts?");

/***/ }),

/***/ "./src/Mobs/index.ts":
/*!***************************!*\
  !*** ./src/Mobs/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Chestnut: () => (/* binding */ Chestnut),\n/* harmony export */   Cow: () => (/* binding */ Cow),\n/* harmony export */   Fish: () => (/* binding */ Fish),\n/* harmony export */   Mob: () => (/* binding */ Mob),\n/* harmony export */   MobFactory: () => (/* binding */ MobFactory)\n/* harmony export */ });\nconst canvas = document.querySelector('#myCanvas');\nconst ctx = canvas.getContext('2d');\nclass Mob {\n    constructor({ position, speed, type }) {\n        this.position = position;\n        this.speed = speed;\n        this.texture = new Image();\n        this.died = false;\n        this.type = type;\n        this.hp = 1;\n    }\n    die() {\n        this.died = true;\n    }\n    move(enemy) {\n        const drawMob = () => {\n            ctx.drawImage(this.texture, this.position.x, this.position.y);\n        };\n        const animate = () => {\n            ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);\n            if (enemy.position.x < this.position.x) {\n                this.position.x -= this.speed;\n            }\n            else {\n                this.position.x += this.speed;\n            }\n            if (enemy.position.y < this.position.y) {\n                this.position.y -= this.speed;\n            }\n            else {\n                this.position.y += this.speed;\n            }\n            const halfOfMobWidth = this.texture.width / 2;\n            const halfOfMobHeight = this.texture.height / 2;\n            if ((enemy.position.x - halfOfMobWidth < this.position.x && enemy.position.x + halfOfMobWidth > this.position.x) && (enemy.position.y - halfOfMobHeight < this.position.y && enemy.position.y + halfOfMobHeight > this.position.y)) {\n                enemy.die();\n            }\n            drawMob();\n            if (!this.died) {\n                setTimeout(() => {\n                    requestAnimationFrame(animate);\n                }, 15);\n            }\n            else {\n                ctx.clearRect(this.position.x + this.speed - 10, this.position.y, 110, 53);\n            }\n        };\n        animate();\n    }\n}\nclass Fish extends Mob {\n    constructor(characteristics) {\n        super(characteristics);\n        this.texture.src = './images/fish.png';\n    }\n}\nclass Chestnut extends Mob {\n    constructor(characteristics) {\n        super(characteristics);\n        this.texture.src = './images/chestnut.png';\n        this.hp = 100;\n    }\n}\nclass Cow extends Mob {\n    constructor(characteristics) {\n        super(characteristics);\n        this.texture.src = './images/cow.png';\n        this.hp = 1000;\n    }\n}\nclass MobFactory {\n    create(characteristics) {\n        return new MobFactory.list[characteristics.type](characteristics);\n    }\n    createRandom(characteristics) {\n        const mobNames = Object.keys(MobFactory.list);\n        const randomMobIndex = Math.floor(Math.random() * mobNames.length);\n        const partialCharacteristics = characteristics;\n        partialCharacteristics.type = mobNames[randomMobIndex];\n        return new MobFactory.list[partialCharacteristics.type](partialCharacteristics);\n    }\n}\nMobFactory.list = {\n    Fish,\n    Chestnut,\n    // Cow\n};\n\n\n//# sourceURL=webpack://rpg/./src/Mobs/index.ts?");

/***/ }),

/***/ "./src/Weapons/index.ts":
/*!******************************!*\
  !*** ./src/Weapons/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gun: () => (/* binding */ Gun),\n/* harmony export */   WeaponFactory: () => (/* binding */ WeaponFactory)\n/* harmony export */ });\nconst canvas = document.querySelector('#myCanvas');\nconst ctx = canvas.getContext('2d');\nclass Weapon {\n    constructor({ dmg, range, type, position }) {\n        this.dmg = dmg;\n        this.range = range;\n        this.texture = new Image();\n        this.position = position || { x: NaN, y: NaN };\n        this.type = type;\n    }\n}\n// class Sword extends Weapon {\n//   attack() {\n//   }\n// }\nclass Gun extends Weapon {\n    constructor(weaponCharacteristics) {\n        super(weaponCharacteristics);\n        this.texture.src = './images/gun.png';\n        this.bullet = {\n            texture: new Image()\n        };\n        this.bullet.texture.src = './images/bullet.png';\n    }\n    attack(mobs) {\n        return new Promise(resolve => {\n            let x = this.position.x + 150;\n            const y = this.position.y - 5;\n            const speed = 2;\n            const drawBall = () => {\n                // ctx.clearRect(x + speed - 50, y - 20, 40, 40);\n                // ctx.beginPath();\n                // ctx.arc(x, y, 20, 0, Math.PI * 2);\n                // ctx.fillStyle = 'blue';\n                // ctx.fill();\n                // ctx.closePath();\n                ctx.clearRect(x + speed - 50, y - 10, 40, 40);\n                ctx.drawImage(this.bullet.texture, x, y);\n            };\n            const animate = () => {\n                x += speed;\n                drawBall();\n                const damagedMobIndex = mobs.findIndex(({ position, texture }) => {\n                    const halfOfMobWidth = texture.width / 2;\n                    const halfOfMobHeight = texture.height / 2;\n                    return (position.x - halfOfMobWidth < x && position.x + halfOfMobWidth > x) && (position.y - halfOfMobHeight < y && position.y + halfOfMobHeight + 40 > y);\n                });\n                if (damagedMobIndex > -1) {\n                    ctx.clearRect(x + speed - 20, y, 60, 40);\n                    return resolve([mobs[damagedMobIndex], damagedMobIndex]);\n                }\n                if (canvas.width > x || 0 > canvas.width) {\n                    requestAnimationFrame(animate);\n                }\n                else {\n                    ctx.clearRect(x + speed - 40, y - 10, 40, 40);\n                    return resolve(false);\n                }\n            };\n            animate();\n        });\n    }\n}\nclass WeaponFactory {\n    create(characteristics) {\n        return new WeaponFactory.list[characteristics.type](characteristics);\n    }\n}\nWeaponFactory.list = {\n    Gun\n};\n\n\n//# sourceURL=webpack://rpg/./src/Weapons/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Characters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Characters */ \"./src/Characters/index.ts\");\n/* harmony import */ var _Maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Maps */ \"./src/Maps/index.ts\");\n/* harmony import */ var _Mobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Mobs */ \"./src/Mobs/index.ts\");\n/* harmony import */ var _Weapons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Weapons */ \"./src/Weapons/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\nconst canvas = document.querySelector('#myCanvas');\nconst ctx = canvas.getContext('2d');\nconst background = document.getElementById('background');\nbackground.style.width = window.innerWidth + 'px';\nbackground.style.height = window.innerHeight + 'px';\ncanvas.style.border = '0';\ncanvas.width = window.innerWidth - 5;\ncanvas.height = window.innerHeight - 5;\n// ctx.fillStyle = 'gray';\n// ctx.fillRect(0, 0, canvas.width, canvas.height);\nconst weaponFactory = new _Weapons__WEBPACK_IMPORTED_MODULE_3__.WeaponFactory();\nconst mobFactory = new _Mobs__WEBPACK_IMPORTED_MODULE_2__.MobFactory();\nconst gun = weaponFactory.create({ type: 'Gun', range: 50, dmg: 17 });\nconst character = new _Characters__WEBPACK_IMPORTED_MODULE_0__.Character({\n    img: './images/character.png',\n    position: {\n        x: canvas.width / 2,\n        y: canvas.height / 2\n    },\n    weapon: gun\n});\nconst mainMap = new _Maps__WEBPACK_IMPORTED_MODULE_1__.GameMap({ character });\ndocument.addEventListener('keydown', (event) => __awaiter(void 0, void 0, void 0, function* () {\n    switch (event.key) {\n        case 'ArrowLeft':\n            character.move('left');\n            break;\n        case 'ArrowRight':\n            character.move('right');\n            break;\n        case 'ArrowUp':\n            character.move('up');\n            break;\n        case 'ArrowDown':\n            character.move('down');\n            break;\n    }\n    if (event.key === 'x') {\n        const isMob = yield character.attack(mainMap.mobs);\n        if (isMob) {\n            const [mob, mobIndex] = isMob;\n            mob.hp -= character.weapon.dmg;\n            if (mob.hp < 0) {\n                mainMap.killMob(mobIndex);\n            }\n        }\n    }\n}));\nlet spawnTime = 3000;\nsetInterval(() => {\n    spawnTime = spawnTime - spawnTime / 10;\n}, 10000);\nsetInterval(() => {\n    const fish = mobFactory.createRandom({\n        position: {\n            x: Math.floor(Math.random() * (1920 - 960 + 1)) + 960,\n            y: Math.floor(Math.random() * 1081)\n        },\n        speed: 1,\n    });\n    mainMap.spawnMob(fish);\n}, spawnTime);\n\n\n//# sourceURL=webpack://rpg/./src/index.ts?");

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