import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.startClock();
  }



  currentHour: string = "00";
  currentMinute: string = "00";
  currentSecond: string = "00";
  isPM: boolean = false;

  currentTime: number = 0;


  getTimeValues() {

    let currentMilli: number = Date.now();

    let current: Date = new Date(currentMilli);
    this.currentTime = currentMilli;

    this.isPM = current.getHours() > 12 ? true : false;

    let current12Hour: number = this.isPM ? (current.getHours() - 12) : current.getHours();

    this.currentHour = current12Hour < 10 ? (current12Hour.toString()) : current12Hour.toString();
    this.currentMinute = current.getMinutes() < 10 ? ("0" + current.getMinutes().toString()) : current.getMinutes().toString();
    this.currentSecond = current.getSeconds() < 10 ? ("0" + current.getSeconds().toString()) : current.getSeconds().toString();

  }

  startClock() {
    setInterval(() => {
      this.currentTime += 1000;
      this.getTimeValues();
    }, 1000);
  }


}
