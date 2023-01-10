import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private timeIntervalSec = 2;
  color_list: { color: string; }[] = [];

  constructor() {
    setInterval(() => {
      this.color_list = [{
        color : this.getColor()
      }];
    }, this.timeIntervalSec * 1000);
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
