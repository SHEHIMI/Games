//Event listeners
var keysPressed = {};
var keypress = {};
addEventListener(
  "keydown",
  function (e) {
    keysPressed[e.keyCode] = true;
  },
  false
);
addEventListener(
  "keypress",
  function (e) {
    keypress[e.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function (e) {
    delete keysPressed[e.keyCode];
  },
  false
);

//Load Image
// we trigger onload since drawImage wont draw if image not loaded

//doomGuy
let doomguyLoaded = false;
let doomGuyPic = new Image();
doomGuyPic.onload = function () {
  doomguyLoaded = true;
};
doomGuyPic.src = "images/doomguySprite.png";

//Menu image
let MenuLoaded = false;
let MenuPic = new Image();
MenuPic.onload = function () {
  MenuLoaded = true;
};
MenuPic.src = "images/Menu.jpg";

//background
let bgLoaded = false;
let bg = new Image();
bg.onload = function () {
  bgLoaded = true;
};
bg.src = "images/background.jpg";

//bullet
let bulletLoaded = false;
let bulletPic = new Image();
bulletPic.onload = function () {
  bulletLoaded = true;
};
bulletPic.src = "images/bullet.png";

//enemies
let cacoDemonLoaded = false;
let cacoDemonPic = new Image();
cacoDemonPic.onload = function () {
  cacoDemonLoaded = true;
};
cacoDemonPic.src = "images/Cacodemon_sprite.png";

//enemies wave 1
let cacoDemonlaserLoaded = false;
let cacoDemonlaserPic = new Image();
cacoDemonlaserPic.onload = function () {
  cacoDemonlaserLoaded = true;
};
cacoDemonlaserPic.src = "images/cacoDemonLaser.png";

let cyberDemonLoaded = false;
let cyberDemon = new Image();
cyberDemon.onload = function () {
  cyberDemonLoaded = true;
};
cyberDemon.src = "images/Cyberdemon_sprite.png";
//wave 2
let cyberDemon2Loaded = false;
let cyberDemon2 = new Image();
cyberDemon2.onload = function () {
  cyberDemonLoaded2 = true;
};
cyberDemon2.src = "images/Cyberdemon2_sprite.png";

let cacoDemon2Loaded = false;
let cacoDemon2Pic = new Image();
cacoDemon2Pic.onload = function () {
  cacoDemon2Loaded = true;
};
cacoDemon2Pic.src = "images/Cacodemon2_sprite.png";

//explosion
let spriteSheetloaded = false;
let explosion = new Image();
explosion.onload = function () {
  spriteSheetloaded = true;
};
explosion.src = "Images/spriteSheet.png";
//blood

let bloodSheetloaded = false;
let blood = new Image();
blood.onload = function () {
  bloodSheetloaded = true;
};
blood.src = "Images/bloodsplatterSheet.png";
//lives
let livesLoaded = false;
let livesPic = new Image();
livesPic.onload = function () {
  livesLoaded = true;
};
livesPic.src = "images/lives.png";
//Gameover
let gameoverLoaded = false;
let gameOver = new Image();
gameOver.onload = function () {
  gameoverLoaded = true;
};
gameOver.src = "images/gameOver.png";

//GameBeat
let gameBeatLoaded = false;
let gameBeat = new Image();
gameBeat.onload = function () {
  gameBeatLoaded = true;
};

gameBeat.src = "images/youWin.png";

//MUSIC with JS source: cukmekerb's coding class youtube
let MenuMusic = new Audio("Music/MenuMusic.mp3");
let shotgunSound = new Audio("Music/shotgunSound.mp3");
let GameMusic = new Audio("Music/The Only Thing They Fear Is You.mp3");
let damageSound = new Audio("Music/damage sound.mp3");
let enemyDamage = new Audio("Music/enemyDamage.mp3");
let gameOverSound = new Audio("Music/fatality.mp3");
let victorySound = new Audio("Music/victory.mp3");
