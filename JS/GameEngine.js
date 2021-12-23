/*              Game Engine
 *              DOOM 2D
 *              Mohamad Shehimi
 *              A1910340
 *              CSIS250
 */

class game {
  constructor(cw, ch) {
    this.myCanvas = document.getElementById("mainGame");
    this.ctx = this.myCanvas.getContext("2d");
    this.sprites = [];
    this.canvasWidth = cw;
    this.canvasHeight = ch;
    this.w1loaded = 0;
    this.w2loaded = 0;
    this.w3loaded = 0;
    this.isgameOver = false;
    this.isgameWon = false;
    this.buffer = 0;
    this.killed = 0;
    this.Winbuffer = 0;
  }

  // update function
  update() {
    let lspritesLength = this.sprites.length;
    for (let i = 0; i < lspritesLength; i++) {
      if (this.sprites[i] != null) {
        this.sprites[i].update();
      }
    }

    if (!MenuSprite.getEnabled() && this.w1loaded == 0) {
      DOOM.addSprite(doomguySprite); //0
      DOOM.addSprite(bulletSprite); //1
      DOOM.addSprite(BOOM); //2
      DOOM.addSprite(ouch); //3
      DOOM.addSprite(Timer); //4
      //WAVE 1
      DOOM.addSprite(Demon1); //5
      DOOM.addSprite(demonWeapon1); //6
      DOOM.addSprite(demon2); //7
      DOOM.addSprite(demon3);
      DOOM.addSprite(demon4);
      DOOM.addSprite(demon5);
      this.w1loaded++;
      MenuMusic.pause();
      GameMusic.play();
    }
    //WAVE 2
    if (!demon5.getstate() && !Demon1.getstate() && this.w2loaded == 0) {
      DOOM.addSprite(w2Demon1);
      DOOM.addSprite(w2Demon2);
      DOOM.addSprite(w2Demon3);
      DOOM.addSprite(enemyw2);
      DOOM.addSprite(enemyWw2);
      this.w2loaded++;
    }
    //BOSS
    if (!w2Demon3.getstate() && !enemyw2.getstate() && this.w3loaded == 0) {
      DOOM.addSprite(finalBoss);
      DOOM.addSprite(finalBossWeapon);
      this.w3loaded++;
    }
    //game over
    if (doomguySprite.lives == 0 && this.buffer == 0) {
      this.isgameOver = true;
      Timer.stop();
      GameMusic.pause();
      gameOverSound.play();
      this.buffer++;
    }
    //game beat
    if (finalBoss.hitpoints == 0 && this.Winbuffer == 0) {
      this.isgameWon = true;
      GameMusic.pause();
      victorySound.play();
      Timer.stop();
      this.Winbuffer++;
    }

    if (77 in keysPressed && (this.isgameOver || this.isgameWon)) {
      window.location.reload();
    }

    if (!MenuSprite.getEnabled()) {
      //BACKGROUND
      if (bgLoaded) {
        this.ctx.drawImage(bg, 0, 0, 1300, 600);
      }

      // game over
      if (this.isgameOver) {
        for (let i = 0; i < DOOM.sprites.length; i++) {
          DOOM.sprites.splice(0, DOOM.sprites.length);
        }
        //kill player
        if (this.isgameOver && this.killed < 50) {
          DOOM.addSprite(ouch);
          ouch.setDx(doomguySprite.x);
          ouch.setDy(doomguySprite.y);
          ouch.setDh(200);
          ouch.setDw(200);
          ouch.launch();
          this.killed++;
        }

        if (gameoverLoaded) {
          this.ctx.drawImage(gameOver, 450, 150, 350, 350);
          this.ctx.fillStyle = "white";
          this.ctx.font = "35px arial";
          this.ctx.fillText("press M to play again ", 480, 200);
          this.ctx.fillText(
            "You survived " + Timer.GetTime() + " Seconds",

            480,
            100
          );
          this.ctx.fillText(" Earth has been invaded by demons", 480, 150);
        }
      }
      // game Beat
      if (this.isgameWon) {
        for (let i = 0; i < DOOM.sprites.length; i++) {
          DOOM.sprites.splice(0, DOOM.sprites.length);
        }
        //kill boss
        if (this.isgameWon && this.killed < 50) {
          DOOM.addSprite(ouch);
          ouch.setDx(finalBoss.x);
          ouch.setDy(finalBoss.y);
          ouch.setDh(400);
          ouch.setDw(400);
          ouch.launch();
          this.killed++;
        }
        if (gameBeatLoaded) {
          this.ctx.drawImage(gameBeat, 450, 200, 250, 250);
          this.ctx.fillStyle = "white";
          this.ctx.font = "35px arial";
          this.ctx.fillText("press M to play again ", 480, 200);
          this.ctx.fillText(
            "You Beat the game in : " + Timer.GetTime() + " Seconds",

            480,
            100
          );
          this.ctx.fillText(" Earth has been saved", 480, 150);
        }
      }
    }
  }

  // draw function
  draw() {
    let lspritesLength = this.sprites.length;
    for (let i = 0; i < lspritesLength; i++) {
      if (this.sprites[i] != null) {
        this.sprites[i].draw(this.ctx);
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  addSprite = function (sprite) {
    this.sprites.push(sprite);
  };
}

class doomguy {
  constructor() {
    this.x = 30;
    this.y = 100;
    this.fall = 5;
    this.jump = 3;
    this.rev = false;
    this.lives = 6;
    this.counter = 10;
  }
  update() {
    //jump mechanics
    if (32 in keysPressed) {
      this.y -= this.jump;
      if (this.y <= 25) {
        this.y = 26;
        this.jump = -this.jump;
        this.rev = true;
      }
    } else {
      this.y += this.fall;
    }
    // fall mechanics
    if (this.y + 230 > 487) {
      this.fall = 0;
    } else {
      this.fall = 5;
    }
    if (this.rev && this.y + 230 > 487) {
      this.jump = -this.jump;
      this.rev = false;
    }
  }
  draw(context) {
    this.ctx = context;
    if (doomguyLoaded) {
      this.ctx.drawImage(doomGuyPic, this.x, this.y, 265, 230);
    }
    //lives
    if (livesLoaded) {
      if (this.lives == 6) {
        this.ctx.drawImage(livesPic, 10, 10, 25, 20);
        this.ctx.drawImage(livesPic, 30, 10, 25, 20);
        this.ctx.drawImage(livesPic, 50, 10, 25, 20);
        this.ctx.drawImage(livesPic, 70, 10, 25, 20);
        this.ctx.drawImage(livesPic, 90, 10, 25, 20);
        this.ctx.drawImage(livesPic, 110, 10, 25, 20);
      } else if (this.lives == 5) {
        this.ctx.drawImage(livesPic, 10, 10, 25, 20);
        this.ctx.drawImage(livesPic, 30, 10, 25, 20);
        this.ctx.drawImage(livesPic, 50, 10, 25, 20);
        this.ctx.drawImage(livesPic, 70, 10, 25, 20);
        this.ctx.drawImage(livesPic, 90, 10, 25, 20);
      } else if (this.lives == 4) {
        this.ctx.drawImage(livesPic, 10, 10, 25, 20);
        this.ctx.drawImage(livesPic, 30, 10, 25, 20);
        this.ctx.drawImage(livesPic, 50, 10, 25, 20);
        this.ctx.drawImage(livesPic, 70, 10, 25, 20);
      } else if (this.lives == 3) {
        this.ctx.drawImage(livesPic, 10, 10, 25, 20);
        this.ctx.drawImage(livesPic, 30, 10, 25, 20);
        this.ctx.drawImage(livesPic, 50, 10, 25, 20);
      } else if (this.lives == 2) {
        this.ctx.drawImage(livesPic, 10, 10, 25, 20);
        this.ctx.drawImage(livesPic, 30, 10, 25, 20);
      } else if (this.lives == 1) {
        this.ctx.drawImage(livesPic, 10, 10, 25, 20);
      }
    }
  }
}

class Menu {
  constructor(enabled) {
    this.x = 0;
    this.y = 0;
    this.text = "click space to start!";
    this.textX = 500;
    this.textY = 500;
    this.text2X = 50;
    this.text2Y = 50;
    this.speed = 3;
    this.speed2 = 3;
    this.enabled = enabled;
  }

  getEnabled() {
    return this.enabled;
  }
  enable() {
    this.enabled = true;
  }
  update() {
    this.textY -= this.speed;
    this.text2Y -= this.speed2;
    if (this.textY < 20) {
      this.speed = -this.speed;
    }
    if (this.textY > 600) {
      this.speed = -this.speed;
    }

    if (this.text2Y < 20) {
      this.speed2 = -this.speed2;
    }
    if (this.text2Y > 600) {
      this.speed2 = -this.speed2;
    }

    if (32 in keysPressed) {
      try {
        MenuMusic.play();
      } catch (error) {
        throw error;
      }

      this.text = "Press P to Play!";
    }

    if (80 in keysPressed) {
      this.enabled = false;
      DOOM.sprites.splice(0);
    }
  }
  draw(context) {
    this.ctx = context;

    if (MenuLoaded) {
      this.ctx.drawImage(MenuPic, this.x, this.y, 1350, 650);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "50px Georgia";
      this.ctx.fillText(this.text, this.textX, this.textY);
      this.ctx.fillStyle = "#ff4665";
      this.ctx.font = "15px arial";
      this.ctx.fillText(
        "press w to shoot , space to jump",
        this.text2X,
        this.text2Y
      );
    }
  }
}
class bullet {
  constructor(enabled) {
    this.x = doomguySprite.x + 157;
    this.sound = 0;
    this.enabled = enabled;
    this.collided = false;
    this.prevcall = 0;
    this.delaycall = 1100;
    this.currentTime;
  }
  getEnabled() {
    return this.enabled;
  }
  Disable() {
    this.enabled = false;
  }
  resetBullet() {
    this.x = doomguySprite.x + 157;
    this.y = doomguySprite.y + 60;
  }

  update() {
    this.currentTime = new Date().getTime();
    // to shoot , throttling by 1.1 s is used ref:geeksforgeeks.org javascript throttling
    if (
      87 in keysPressed &&
      !this.enabled &&
      this.currentTime - this.prevcall > this.delaycall
    ) {
      this.prevcall = this.currentTime;
      this.enabled = true;
      this.resetBullet();
      if (this.sound == 1) {
        this.sound--;
      }
    }
    if (this.enabled) {
      this.x += 20;
      //out of bounds
      if (this.x > 1250) {
        this.enabled = false;
      }
      if (this.sound == 0) {
        shotgunSound.play();
        this.sound++;
      }
    }
  }
  draw(context) {
    this.ctx = context;
    if (this.enabled) {
      if (bulletLoaded) {
        this.ctx.drawImage(bulletPic, this.x, this.y, 55, 55);
      }
    }
  }
}

class enemy {
  constructor(enabled, hitpoints, id, x, y, pic) {
    this.x = x;
    this.y = y;
    this.enabled = enabled;
    this.speed = 4;
    this.hitpoints = hitpoints;
    this.id = id;
    this.pic = pic;
  }
  getstate() {
    return this.enabled;
  }
  getID() {
    return this.id;
  }
  update() {
    if (this.enabled) {
      //demon movement
      if (this.x < 1100) {
        this.speed = 0;
        demonWeapon1.enable();
      } else {
        this.x -= this.speed;
      }
      //check collision with bullet
      if (
        this.y <= bulletSprite.y &&
        this.y + 100 >= bulletSprite.y &&
        this.x <= bulletSprite.x + 55 &&
        this.x + 100 >= bulletSprite.x + 55
      ) {
        bulletSprite.Disable();
        bulletSprite.resetBullet();
        enemyDamage.play();
        this.hitpoints--;
      }
      //check hitpoints
      if (this.hitpoints == 0) {
        this.enabled = false;
        BOOM.setDx(this.x);
        BOOM.setDy(this.y);
        BOOM.setDh(100);
        BOOM.setDw(100);
        BOOM.launch();
        demonWeapon1.disable();
        demonWeapon1.resetBullet();
      }
    }
  }
  draw(context) {
    this.ctx = context;
    if (this.enabled) {
      if (cacoDemonLoaded || cacoDemon2Loaded) {
        this.ctx.drawImage(this.pic, this.x, this.y, 100, 100);
      }
    }
  }
}

class enemyLaser {
  constructor(enabled, x, y, id) {
    this.x = x;
    this.y = y;
    this.enabled = enabled;
    this.id = id;
  }
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }
  resetBullet() {
    this.x = 1050;
    this.y = 135;
  }
  update() {
    if (this.enabled) {
      this.x -= 3;
      this.y += Math.sin(45);

      //check collision
      if (
        this.y >= doomguySprite.y &&
        this.y <= doomguySprite.y + 200 &&
        this.x <= doomguySprite.x + 150 &&
        this.x >= doomguySprite.x
      ) {
        this.resetBullet();
        doomguySprite.lives--;
        damageSound.play();
      }
      if (this.x < 20) {
        this.resetBullet();
      }
    }
  }
  draw(context) {
    this.ctx = context;
    if (this.enabled) {
      if (cacoDemonlaserLoaded) {
        this.ctx.drawImage(cacoDemonlaserPic, this.x, this.y, 40, 40);
      }
    }
  }
}
class demon {
  constructor(enabled, x, hitpoints, id, pic, loaded, w, h) {
    this.x = x;
    this.y = 237;
    this.enabled = enabled;
    this.speed = 2;
    this.hitpoints = hitpoints;
    this.id = id;
    this.struck = false;
    this.pic = pic;
    this.loaded = loaded;
    this.w = w;
    this.h = h;
    this.buffer = 0;
  }
  getstate() {
    return this.enabled;
  }
  getID() {
    return this.id;
  }
  update() {
    //demon movement
    this.x -= this.speed;
    //enemy collision with bullet
    if (this.x > 250) {
      if (
        this.y <= bulletSprite.y &&
        this.y + this.h >= bulletSprite.y &&
        this.x <= bulletSprite.x + 55 &&
        this.x + this.w >= bulletSprite.x + 55
      ) {
        bulletSprite.Disable();
        bulletSprite.resetBullet();
        ouch.setDx(this.x - 65);
        ouch.setDy(this.y);
        ouch.setDh(this.h);
        ouch.setDw(this.w + 50);
        ouch.launch();
        this.hitpoints--;
      }
    }

    //check collision with player
    if (this.x <= doomguySprite.x + 180 && this.buffer == 0) {
      doomguySprite.lives--;
      this.struck = true;
      damageSound.play();
      this.buffer++;
    }

    // remove enemy
    if (this.struck || this.hitpoints == 0) {
      //console.log(DOOM.sprites[this.id]);
      DOOM.sprites.splice(this.id, 1);
      for (let i = this.id; i < DOOM.sprites.length; i++) {
        DOOM.sprites[i].id--;
      }
      this.enabled = false;
    }
  }
  draw(context) {
    this.ctx = context;

    this.ctx.drawImage(this.pic, this.x, this.y, this.w, this.h);
  }
}
class anim {
  constructor(bool) {
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10 || 0;
    this.numberOfFrames = 6 || 1;
    this.width = 836;
    this.height = 233;
    this.show = bool;
    this.dx = 0;
    this.dy = 0;
    this.dw = 275;
    this.dh = 275;
  }

  launch() {
    this.show = true;
  }
  //destination x y
  setDx(dx) {
    this.dx = dx;
  }
  setDy(dy) {
    this.dy = dy;
  }
  //destination width and height
  setDw(dw) {
    this.dw = dw;
  }
  setDh(dh) {
    this.dh = dh;
  }

  update() {
    if (this.show) {
      this.tickCount += 1;

      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;

        // If the current frame index is in range
        if (this.frameIndex < this.numberOfFrames - 1) {
          // Go to the next frame
          this.frameIndex += 1;
        } else {
          this.show = false;
          this.frameIndex = 0;
        }
      }
    }
  }

  draw(context) {
    this.ctx = context;
    if (this.show) {
      if (spriteSheetloaded) {
        this.ctx.drawImage(
          explosion,
          (this.frameIndex * this.width) / this.numberOfFrames, //source x
          0, //source  y
          this.width / this.numberOfFrames - 36, //sw
          this.height, //sh
          this.dx, //dx
          this.dy, //dy
          this.dw, //dw
          this.dh //dh
        );
      }
    }
  }
}

class anim2 {
  constructor(bool) {
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 8 || 0;
    this.numberOfFrames = 6 || 1;
    this.width = 3072;
    this.height = 512;
    this.show = bool;
    this.dx = 0;
    this.dy = 0;
    this.dw = 275;
    this.dh = 275;
  }

  launch() {
    this.show = true;
  }
  //destination x y
  setDx(dx) {
    this.dx = dx;
  }
  setDy(dy) {
    this.dy = dy;
  }
  //destination width and height
  setDw(dw) {
    this.dw = dw;
  }
  setDh(dh) {
    this.dh = dh;
  }

  update() {
    if (this.show) {
      this.tickCount += 1;

      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;

        // If the current frame index is in range
        if (this.frameIndex < this.numberOfFrames - 1) {
          // Go to the next frame
          this.frameIndex += 1;
        } else {
          this.show = false;
          this.frameIndex = 0;
        }
      }
    }
  }

  draw(context) {
    this.ctx = context;
    if (this.show) {
      if (bloodSheetloaded) {
        this.ctx.drawImage(
          blood,
          (this.frameIndex * this.width) / this.numberOfFrames, //source x
          0, //source  y
          this.width / this.numberOfFrames, //sw
          this.height, //sh
          this.dx, //dx
          this.dy, //dy
          this.dw, //dw
          this.dh //dh
        );
      }
    }
  }
}
class BOSS {
  constructor() {
    this.hitpoints = 15;
    this.y = 300;
    this.x = 2000;
    this.speed = 2;
    this.speedx = 3;
  }

  update() {
    //boss positioning
    if (this.x < 900) {
      this.speedx = 0;
      finalBossWeapon.enable();
    } else {
      this.x -= this.speedx;
    }
    this.y -= this.speed;

    //boss movement
    if (this.y < 20) {
      this.speed = -this.speed;
    }
    if (this.y > 300) {
      this.speed = -this.speed;
    }

    //check collision with bullet
    if (
      this.y <= bulletSprite.y &&
      this.y + 250 >= bulletSprite.y &&
      this.x <= bulletSprite.x + 55 &&
      this.x + 250 >= bulletSprite.x + 55
    ) {
      bulletSprite.Disable();
      bulletSprite.resetBullet();
      enemyDamage.play();
      this.hitpoints--;
    }
    //check hitpoints
    if (this.hitpoints == 0) {
      DOOM.sprites.splice(7, 1);
      this.enabled = false;
    }
  }

  draw(context) {
    this.ctx = context;
    if (cacoDemon2Loaded) {
      this.ctx.drawImage(cacoDemon2Pic, this.x, this.y, 250, 250);
    }
  }
}
class BOSSLaser {
  constructor(enabled) {
    this.x = 900;
    this.y = finalBoss.y + 15;
    this.enabled = enabled;
  }
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }
  remove() {
    DOOM.sprites.pop();
  }
  resetBullet() {
    this.x = 900;
    this.y = finalBoss.y + 15;
  }
  update() {
    if (this.enabled) {
      this.x -= 4;

      //check collision
      if (
        this.y >= doomguySprite.y &&
        this.y <= doomguySprite.y + 200 &&
        this.x <= doomguySprite.x + 150 &&
        this.x >= doomguySprite.x
      ) {
        this.resetBullet();
        doomguySprite.lives--;
        damageSound.play();
      }
      if (this.x < 20) {
        this.resetBullet();
      }
    }
  }
  draw(context) {
    this.ctx = context;
    if (this.enabled) {
      if (cacoDemonlaserLoaded) {
        this.ctx.drawImage(cacoDemonlaserPic, this.x, this.y, 30, 30);
      }
    }
  }
}
class timer {
  constructor() {
    this.time = 0;
    this.enable = true;
  }

  stop() {
    this.enable = false;
  }

  update() {
    if (this.enable) {
      this.time++;
    }
  }
  GetTime() {
    return Math.trunc(this.time / 60);
  }
  draw(context) {
    this.ctx = context;
    this.ctx.fillStyle = "white";
    this.ctx.font = "35px fantasy";
    this.ctx.fillText(Math.trunc(this.time / 60), 600, 30);
  }
}
// animation frame for multiple browsers
let requestAnimFrame = (function (callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
