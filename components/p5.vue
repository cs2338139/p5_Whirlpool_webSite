<script setup>
import p5 from "p5";
const container = ref();

let sketch = null;

onMounted(() => {
  sketch = new p5((p) => {
    class ball {
      constructor(x, y, r, _color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this._color = _color;
      }
      a = 0;
      xArray = [];
      yArray = [];
      update() {
        for (let i = 0; i < ballShadowCount; i++) {
          if (this.xArray.length != 6) {
            let _x = this.x - (p.windowWidth / 2 - this.x) - (i * (p.windowWidth / 2 - this.x)) / ((ballSpeed / 100) * ballShadowRate);
            this.xArray.push(_x);
          } else {
            this.xArray[i] -= (p.windowWidth / 2 - this.xArray[i]) / ballSpeed;
          }

          if (this.yArray.length != 6) {
            let _y = this.y - (p.windowHeight / 2 - this.y) - (i * (p.windowHeight / 2 - this.y)) / ((ballSpeed / 100) * ballShadowRate);
            this.yArray.push(_y);
          } else {
            this.yArray[i] -= (p.windowHeight / 2 - this.yArray[i]) / ballSpeed;
          }
        }

        this.r += 0.03;
      }

      display() {
        for (let i = 0; i < this.xArray.length; i++) {
          p.push();
          this._color.setAlpha(this.a + (255 / this.xArray.length) * i);
          p.fill(this._color);
          p.noStroke();
          p.ellipse(this.xArray[i], this.yArray[i], this.r);
          p.pop();
        }
      }
    }

    let ballCountMax = 10;
    let balls = new Array(ballCountMax);
    let ballShadowCount = 6;
    let ballSpeed = 100;
    let ballShadowRate = 30;
    let deviation = 120;
    let _color = [p.color(235, 189, 52), p.color(72, 197, 232), p.color(240, 109, 58)];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent(container.value);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background(10);
      let x, y;
      for (let i = 0; i < ballCountMax; i++) {
        if (!balls[i]) {
          x = p.randomGaussian() * deviation + p.windowWidth / 2;
          y = p.randomGaussian() * deviation + p.windowHeight / 2;
          // balls.push(new ball(x, y, p.random(1, 2), p.random(_color)));
          balls[i] = new ball(x, y, p.random(1, 2), p.random(_color));
          // console.log(balls);
          break;
        }
      }
      let lastShadow = ballCountMax - 1;
      for (let i = 0; i <= balls.length; i++) {
        if (balls[i] != null) {
          balls[i].update();
          balls[i].display();
          if (balls[i].xArray[lastShadow] + balls[i].r < 0 || balls[i].xArray[lastShadow] - balls[i].r > p.windowWidth || balls[i].yArray[lastShadow] + balls[i].r < 0 || balls[i].yArray[lastShadow] - balls[i].r > p.windowHeight) {
            balls[i] = null;
            console.log(balls[i]);
          }
          console.log(balls[i].xArray[lastShadow] + balls[i].r < 0 + "_" + (balls[i].xArray[lastShadow] - balls[i].r) > p.windowWidth + "_" + (balls[i].yArray[lastShadow] + balls[i].r) < 0 + "_" + (balls[i].yArray[lastShadow] - balls[i].r) > p.windowHeight);
        }
      }
    };
  });
});
</script>

<template>
  <div ref="container"></div>
</template>

<style></style>
