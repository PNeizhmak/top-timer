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
  interval: any; 
  startDuration = 450;

  state: 'start' | 'stop' = 'stop';

  circleR = circleR
  circleDasharray = circleDasharray;

  color_list: { color: string; }[] = [];

  constructor() {}

  startTimer(duration: number) {
    this.state = 'start';
    clearInterval(this.interval);
    this.timer = duration;
    this.updateTimeValue();
    this.interval = setInterval(() => {
        this.updateTimeValue()
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
    this.state = 'stop';
  }

  percentageOffset(percent: any) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }

  // swapDuration() {
  //   this.startDuration = this.startDuration === 1 ? 0.5 : 1;
  // }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds
    this.time.next(text); 

    const totalTime = this.startDuration;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

    this.color_list = [{
      color : this.getColor()
    }];

    --this.timer;
    if (this.timer < -1) {
      // this.swapDuration();
      this.startTimer(this.startDuration);
    }
  }

  getColor() {
    var color = "#";
      for (var i = 0; i < 3; i++)
      {
          var part = Math.round(Math.random() * 255).toString(16);
          color += (part.length > 1) ? part : "0" + part;
      }
      return color;
  }

}
