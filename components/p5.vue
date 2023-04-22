<script setup>
import p5 from "p5";
const container = ref();

let sketch = null;

onMounted(() => {
  sketch = new p5((p) => {
    class ball {
      constructor(x, y, r, _color, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this._color = _color;
        this.speed = speed;
      }
      a = 0;
      xArray = [];
      yArray = [];
      aArray = [];
      update() {
        for (let i = 0; i < ballShadowCount; i++) {
          if (this.xArray.length != ballShadowCount) {
            let _x = this.x - (p.windowWidth / 2 - this.x) - ((i * (p.windowWidth / 2 - this.x)) / this.speed / 100) * ballShadowRate;
            this.xArray.push(_x);
          } else {
            this.xArray[i] -= ((p.windowWidth / 2 - this.xArray[i]) / 1000) * this.speed;
          }

          if (this.yArray.length != ballShadowCount) {
            let _y = this.y - (p.windowHeight / 2 - this.y) - ((i * (p.windowHeight / 2 - this.y)) / this.speed / 100) * ballShadowRate;
            this.yArray.push(_y);
          } else {
            this.yArray[i] -= ((p.windowHeight / 2 - this.yArray[i]) / 1000) * this.speed;
          }

          if (this.aArray.length != ballShadowCount) {
            this.aArray.push(0);
          } else {
            if (this.aArray[i] < this.a + (255 / this.xArray.length) * i) this.aArray[i] += 1;
          }
          // this._color.setAlpha(this.a + (255 / this.xArray.length) * i);
        }

        if (this.r < ballMaxR) this.r += 0.04;
      }

      // AddAngleX(x){
      //   let newX=

      //   return
      // }

      display() {
        for (let i = 0; i < this.xArray.length; i++) {
          p.push();
          this._color.setAlpha(this.aArray[i]);
          p.fill(this._color);
          p.noStroke();
          p.ellipse(this.xArray[i], this.yArray[i], this.r);
          p.pop();
        }
      }
    }

    let ballCountMax = 500;
    let balls = new Array(ballCountMax);
    let ballShadowCount = 6;
    let ballMinSpeed = 8;
    let ballMaxSpeed = 20;
    let ballShadowRate = 20;
    let deviation = 120;
    let ballOneTimeAppear = 3;
    let ballMaxR = 25;
    let angle = 0;
    let _color = [p.color(235, 189, 52), p.color(72, 197, 232), p.color(240, 109, 58)];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent(container.value);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background(10);
      let _ballOneTimeAppear = 0;
      for (let i = 0; i < ballCountMax; i++) {
        if (!balls[i]) {
          let x, y;
          do {
            x = p.randomGaussian() * deviation + p.windowWidth / 2;
            y = p.randomGaussian() * deviation + p.windowHeight / 2;
          } while (p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) < 20 || p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) > 30);

          balls[i] = new ball(x, y, p.random(1, 2), p.random(_color), p.random(ballMinSpeed, ballMaxSpeed));
          _ballOneTimeAppear++;
          if (_ballOneTimeAppear >= ballOneTimeAppear) break;
        }
      }
      let lastShadow = ballShadowCount - 1;
      for (let i = 0; i <= balls.length; i++) {
        if (balls[i] != null) {
          balls[i].update();
          balls[i].display();
          let lastBallShadow_width_Left = balls[i].xArray[lastShadow] + balls[i].r;
          let lastBallShadow_width_Right = balls[i].xArray[lastShadow] - balls[i].r;
          let lastBallShadow_Height_Up = balls[i].yArray[lastShadow] + balls[i].r;
          let lastBallShadow_Height_Down = balls[i].yArray[lastShadow] - balls[i].r;

          if (lastBallShadow_width_Left < 0 || lastBallShadow_width_Right > p.windowWidth || lastBallShadow_Height_Up < 0 || lastBallShadow_Height_Down > p.windowHeight) {
            balls[i] = null;
          }
        }
      }
    };

    p.mouseWheel = (event) => {
      angle += event.delta/100;
      console.log(angle);
    };
  });
});
</script>

<template>
  <div ref="container"></div>
</template>

<style></style>
