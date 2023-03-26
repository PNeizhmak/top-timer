import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  percent: BehaviorSubject<number> = new BehaviorSubject(100);

  timer: number;
  timerInterval: any;
  timerVal: number;

  state: 'start' | 'stop' = 'stop';

  circleR = circleR;
  circleDasharray = circleDasharray;

  color_list: { color: string; }[] = [];

  gradientStep: number;
  currentStep = 0;

  green = "#46FF46";
  yellow = "#FFFD46";
  red = "#FF4646";

  constructor() { }

  startTimer(duration: number) {
    this.state = 'start';
    this.timer = duration;
    this.updateTimeValue();
    this.timerInterval = setInterval(() => {
      this.updateTimeValue()
    }, 1000);
    this.updateColorValue();
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.time.next('00:00');
    this.state = 'stop';
  }

  percentageOffset(percent: any) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds
    this.time.next(text);

    const totalTime = this.timerVal;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

    --this.timer;
    if (this.timer < 0) {
      this.stopTimer();
    }
  }

  updateColorValue() {
    var colorPercentile: any = this.colorMap.get(this.green);

    for (let key of this.colorMap.keys()) {
      colorPercentile = this.colorMap.get(key);
      var colorUpdateInterval = (this.timerVal * colorPercentile / 100) * 1000;

      setTimeout(() => {
        this.getColor(key);
        console.log(key, this.time.value);
      }, colorUpdateInterval);
    }
  }

  /*
    @key represents the color
    @value represents percent from @timerVal to apply the @key (change the color)
    Example:
      x = 10 sec. green=5 sec, yellow=3 sec, red=2 sec
      x = 20 sec. green=10 sec, yellow=6 sec, red= 4 sec
  */
  colorMap = new Map<string, number>([
    [this.green, 0],
    [this.yellow, 50],
    [this.red, 80]
  ]);

  getColor(color: string) {
    this.color_list = [{
      color: color
    }];
  }

  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }
}
