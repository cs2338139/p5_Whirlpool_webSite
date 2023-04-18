<script setup>
import p5 from "p5";
const container = ref();

let sketch = null;

onMounted(() => {
  sketch = new p5((p) => {
    class ball {
      constructor(x, y, r, _color, a) {
        this.x = x;
        this.y = y;
        this.r = r;
        this._color = _color;
        this.a = a;
      }
      stateOfA = true;
      update() {
        if (this.stateOfA) {
          this.a += 0.5;
          if (this.a >= 90) this.stateOfA = false;
        }
        if (!this.stateOfA) this.ca -= 0.5;
        // if (p.mouseX == p.pmouseX && p.mouseY == p.pmouseY) {
        //   this.x -= (p.mouseX - this.x) / p.random(300, 550);
        //   this.y -= (p.mouseY - this.y) / p.random(300, 550);
        // }
        this.x -= (p.windowWidth / 2 - this.x) / p.random(300, 550);
        this.y -= (p.windowHeight / 2 - this.y) / p.random(300, 550);
        this.r += 0.01;
      }

      display() {
        p.fill(this._color);
        p.noStroke();
        p.ellipse(this.x, this.y, this.r);
      }
    }

    let index = 0;
    let balls = [];
    let deviation = 120;
    let _color = ["rgb(235, 189, 52)", "rgb(72, 197, 232)"];

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent(container.value);
    };

    function windowResized() {
      resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
      p.background(10);
      let x, y;
      if (index >= 499) index = 0;
      x = p.randomGaussian() * deviation + p.windowWidth / 2;
      y = p.randomGaussian() * deviation + p.windowHeight / 2;
      //   x = p.randomGaussian() * deviation + p.mouseX;
      //   y = p.randomGaussian() * deviation + p.mouseY;
      balls.push(new ball(x, y, p.random(1, 2), p.random(_color), p.random(1, 5)));
      index++;

      for (let i = 0; i <= balls.length; i++) {
        if (balls[i] != null) {
          balls[i].update();
          balls[i].display();
          if (balls[i].a <= 0.1) balls[i] = null;
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
