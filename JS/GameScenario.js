//create game
let DOOM = new game(1300, 1300);
//create Menu
let MenuSprite = new Menu(true);
DOOM.addSprite(MenuSprite);

//player
let doomguySprite = new doomguy(); //0
//bullet
let bulletSprite = new bullet(false); //1
//explosion
let BOOM = new anim(false); //2
//blood
let ouch = new anim2(false); //3
//timer
let Timer = new timer();

//enemies WAVE 1
let Demon1 = new enemy(true, 3, 5, 2000, 100, cacoDemonPic); //5

let demonWeapon1 = new enemyLaser(false, 1050, 135, 6);

let demon2 = new demon(
  true,
  1500,
  3,
  7,
  cyberDemon,
  cyberDemonLoaded,
  265,
  230
);

let demon3 = new demon(
  true,
  1900,
  3,
  8,
  cyberDemon,
  cyberDemonLoaded,
  265,
  230
);

let demon4 = new demon(
  true,
  2300,
  3,
  9,
  cyberDemon,
  cyberDemonLoaded,
  265,
  230
);

let demon5 = new demon(
  true,
  2600,
  3,
  10,
  cyberDemon,
  cyberDemonLoaded,
  265,
  230
);

//enemies wave 2 with more hitpoints
let enemyw2 = new enemy(true, 4, 2, 2000, 100, cacoDemon2Pic);
let enemyWw2 = new enemyLaser(false, 3);
let w2Demon1 = new demon(
  true,
  1500,
  5,
  7,
  cyberDemon2,
  cyberDemon2Loaded,
  270,
  245
);

let w2Demon2 = new demon(
  true,
  2000,
  5,
  8,
  cyberDemon2,
  cyberDemon2Loaded,
  270,
  245
);

let w2Demon3 = new demon(
  true,
  2500,
  5,
  9,
  cyberDemon2,
  cyberDemon2Loaded,
  270,
  245
);
//BOSS
let finalBoss = new BOSS();
let finalBossWeapon = new BOSSLaser(false);
//animate game
function animate(myGame) {
  myGame.clear();
  myGame.update();
  myGame.draw();

  requestAnimFrame(function () {
    animate(myGame);
  });
}
animate(DOOM);
