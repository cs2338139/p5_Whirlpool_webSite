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
        for (let i = 0; i < dynamicBallShadowCount; i++) {
          if (this.xArray.length != dynamicBallShadowCount) {
            let _x = this.x - (p.windowWidth / 2 - this.x) - ((i * (p.windowWidth / 2 - this.x)) / this.speed / 100) * dynamicBallShadowRate;
            this.xArray.push(_x);
          } else {
            this.xArray[i] -= ((p.windowWidth / 2 - this.xArray[i]) / 1000) * this.speed;
          }

          if (this.yArray.length != dynamicBallShadowCount) {
            let _y = this.y - (p.windowHeight / 2 - this.y) - ((i * (p.windowHeight / 2 - this.y)) / this.speed / 100) * dynamicBallShadowRate;
            this.yArray.push(_y);
          } else {
            this.yArray[i] -= ((p.windowHeight / 2 - this.yArray[i]) / 1000) * this.speed;
          }

          if (this.aArray.length != dynamicBallShadowCount) {
            this.aArray.push(0);
          } else {
            if (this.aArray[i] < this.a + (255 / this.xArray.length) * i) this.aArray[i] += 1;
          }
          // this._color.setAlpha(this.a + (255 / this.xArray.length) * i);
        }

        if (this.r < dynamicBallMaxR) this.r += 0.04;
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

    let staticBallsCountMax = 500;
    let staticBalls = new Array(staticBallsCountMax);
    let dynamicBallCountMax = 500;
    let dynamicBalls = new Array(dynamicBallCountMax);
    let dynamicBallShadowCount = 6;
    let dynamicBallMinSpeed = 8;
    let dynamicBallMaxSpeed = 20;
    let dynamicBallShadowRate = 20;
    let deviation = 120;
    let dynamicBallOneTimeAppear = 3;
    let dynamicBallMaxR = 25;
    let movePos = 0;
    let _color = [p.color(235, 189, 52), p.color(72, 197, 232), p.color(240, 109, 58)];
    let _staticColor = [p.color(235, 109, 52), p.color(2, 197, 232), p.color(240, 0, 58)];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent(container.value);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background(10);
      CreateStaticBalls();
      CreateDynamicBalls();
      DynamicBallsUpdate();
    };

    function CreateStaticBalls() {
      for (let i = 0; i < staticBallsCountMax; i++) {
        let x, y;
        do {
          x = p.randomGaussian() * deviation + p.windowWidth / 2;
          y = p.randomGaussian() * deviation + p.windowHeight / 2;
        } while (p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) < 20 || p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) > 30);

        staticBalls[i] = new ball(x, y, p.random(1, 2), p.random(_staticColor), p.random(dynamicBallMinSpeed, dynamicBallMaxSpeed));
        staticBalls[i].display();
        //FIXME
      }
    }

    function CreateDynamicBalls() {
      let _ballOneTimeAppear = 0;
      for (let i = 0; i < dynamicBallCountMax; i++) {
        if (!dynamicBalls[i]) {
          let x, y;
          do {
            x = p.randomGaussian() * deviation + p.windowWidth / 2;
            y = p.randomGaussian() * deviation + p.windowHeight / 2;
          } while (p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) < 20 || p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) > 30);

          dynamicBalls[i] = new ball(x, y, p.random(1, 2), p.random(_color), p.random(dynamicBallMinSpeed, dynamicBallMaxSpeed));
          _ballOneTimeAppear++;
          if (_ballOneTimeAppear >= dynamicBallOneTimeAppear) break;
        }
      }
    }

    function DynamicBallsUpdate() {
      let lastShadow = dynamicBallShadowCount - 1;
      for (let i = 0; i <= dynamicBalls.length; i++) {
        if (dynamicBalls[i] != null) {
          dynamicBalls[i].update();
          dynamicBalls[i].display();
          if (CheckDynamicBallOutSide(dynamicBalls[i], lastShadow)) dynamicBalls[i] = null;
        }
      }
    }

    function CheckDynamicBallOutSide(ball, lastShadow) {
      let isOutSide = false;
      let lastBallShadow_width_Left = ball.xArray[lastShadow] + ball.r;
      let lastBallShadow_width_Right = ball.xArray[lastShadow] - ball.r;
      let lastBallShadow_Height_Up = ball.yArray[lastShadow] + ball.r;
      let lastBallShadow_Height_Down = ball.yArray[lastShadow] - ball.r;

      if (lastBallShadow_width_Left < 0 || lastBallShadow_width_Right > p.windowWidth || lastBallShadow_Height_Up < 0 || lastBallShadow_Height_Down > p.windowHeight) {
        isOutSide = true;
      }

      return isOutSide;
    }

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
