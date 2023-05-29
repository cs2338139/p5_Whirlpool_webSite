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
        for (let i = 0; i < dynamicBallSetting.shadow.count; i++) {
          if (this.xArray.length != dynamicBallSetting.shadow.count) {
            let _x = this.x - (p.windowWidth / 2 - this.x) - ((i * (p.windowWidth / 2 - this.x)) / this.speed / 100) * dynamicBallSetting.shadow.rate;
            this.xArray.push(_x);
          } else {
            this.xArray[i] -= ((p.windowWidth / 2 - this.xArray[i]) / 1000) * this.speed;
          }

          if (this.yArray.length != dynamicBallSetting.shadow.count) {
            let _y = this.y - (p.windowHeight / 2 - this.y) - ((i * (p.windowHeight / 2 - this.y)) / this.speed / 100) * dynamicBallSetting.shadow.rate;
            this.yArray.push(_y);
          } else {
            this.yArray[i] -= ((p.windowHeight / 2 - this.yArray[i]) / 1000) * this.speed;
          }

          if (this.aArray.length != dynamicBallSetting.shadow.count) {
            this.aArray.push(0);
          } else {
            if (this.aArray[i] < this.a + (255 / this.xArray.length) * i) this.aArray[i] += 1;
          }
        }

        if (this.r < dynamicBallSetting.r.max) this.r += 0.04;
      }

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

      displayStatic() {
          p.push();
          this._color.setAlpha(255);
          p.fill(this._color);
          p.noStroke();
          p.ellipse(this.x, this.y, this.r);
          p.pop();
          // console.log(staticBalls[i]);
      }
    }

    class StaticBallSetting {
      constructor(countMax) {
        this.countMax = countMax;
      };
      deviation = 500;
      R = class {
        startMin = 1;
        startMax = 10;
      };

      // color = [p.color(235, 109, 52), p.color(2, 197, 232), p.color(240, 0, 58)];
      color = [p.color(235, 189, 52), p.color(72, 197, 232), p.color(240, 109, 58)];
      r = new this.R();
    }
    let staticBallSetting = new StaticBallSetting(200);
    let staticBalls = new Array(staticBallSetting.countMax);

    class DynamicBallSetting {
      constructor(countMax) {
        this.countMax = countMax;
      }
      deviation=120;
      Shadow = class {
        count = 6;
        rate = 25;
      };
      Speed = class {
        min = 8;
        max = 15;
      };
      R = class {
        startMin = 1;
        startMax = 2;
        max = 25;
      };

      oneTimeAppear = 3;
      color = [p.color(235, 189, 52), p.color(72, 197, 232), p.color(240, 109, 58)];
      shadow = new this.Shadow();
      speed = new this.Speed();
      r = new this.R();
    }
    let dynamicBallSetting = new DynamicBallSetting(300);
    let dynamicBalls = new Array(dynamicBallSetting.countMax);
    let movePos = 0;

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
      for (let i = 0; i < staticBallSetting.countMax; i++) {
        if (!staticBalls[i]) {
          let x, y;
          do {
            x = p.randomGaussian() * staticBallSetting.deviation + p.windowWidth / 2;
            y = p.randomGaussian() * staticBallSetting.deviation + p.windowHeight / 2;
          } while (p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) < 400);

          staticBalls[i] = new ball(x, y, p.random(staticBallSetting.r.startMin, staticBallSetting.r.startMax), p.random(staticBallSetting.color), p.random(dynamicBallSetting.speed.min, dynamicBallSetting.speed.max));
        }
        staticBalls[i].displayStatic();
        // console.log(staticBalls[i]);
      }
    }

    function CreateDynamicBalls() {
      let _ballOneTimeAppear = 0;
      for (let i = 0; i < dynamicBallSetting.countMax; i++) {
        if (!dynamicBalls[i]) {
          let x, y;
          do {
            x = p.randomGaussian() * dynamicBallSetting.deviation + p.windowWidth / 2;
            y = p.randomGaussian() * dynamicBallSetting.deviation + p.windowHeight / 2;
          } while (p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) < 20 || p.dist(p.windowWidth / 2, p.windowHeight / 2, x, y) > 30);

          dynamicBalls[i] = new ball(x, y, p.random(dynamicBallSetting.r.startMin, dynamicBallSetting.r.startMax), p.random(dynamicBallSetting.color), p.random(dynamicBallSetting.speed.min, dynamicBallSetting.speed.max));
          _ballOneTimeAppear++;
          if (_ballOneTimeAppear >= dynamicBallSetting.oneTimeAppear) break;
        }
      }
    }

    function DynamicBallsUpdate() {
      let lastShadow = dynamicBallSetting.shadow.count - 1;
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

    // p.mouseWheel = (event) => {
    //   // angle += event.delta / 100;
    //   // console.log(angle);
    // };
  });
});
</script>

<template>
  <div ref="container"></div>
</template>

<style></style>
