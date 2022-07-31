import { RundownService } from './../rundown/rundown.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rundown } from '../rundown/rundown.model';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  @Input() rundown: Rundown = new Rundown("", "", "", new Date(), 0, 0, []);
  @Output() getIs24Hour = new EventEmitter<boolean>();
  @Output() getIsPM = new EventEmitter<boolean>();

  constructor(public rundownService: RundownService, public alertService: AlertService) { }

  ngOnInit(): void {
    this.getTimeValues();
    this.startClock();
  }

  currentHour: string = "00";
  currentMinute: string = "00";
  currentSecond: string = "00";
  isPM: boolean = false;
  is24Hour: boolean = false;
  currentTime: number = 0;

  testGetMilli(): string {
    let currentMilli: number = Date.now();
    return this.rundownService.formatFromMilli(currentMilli);
  }

  getTimeValues() {

    let currentMilli: number = Date.now();

    let current: Date = new Date(currentMilli);


    this.currentTime = currentMilli;

    this.isPM = current.getHours() > 12 ? true : false;

    let current12Hour: number = this.isPM ? (current.getHours() - 12) : current.getHours();
    let current24Hour: number = current.getHours();

    if (this.is24Hour) {
      if (current24Hour == 0) {
        this.currentHour = "12";
      } else if (current24Hour < 10) {
        this.currentHour = "0" + current24Hour.toString();
      } else {
        this.currentHour = current24Hour.toString();
      }
    } else {
      this.currentHour = current12Hour.toString();
    }

    // this.currentHour = this.is24Hour ? current24Hour.toString() : current12Hour == 0 ? "12" : current12Hour > 12 ? ((current12Hour - 12).toString()) : current12Hour.toString();

    this.currentMinute = current.getMinutes() < 10 ? ("0" + current.getMinutes().toString()) : current.getMinutes().toString();

    this.currentSecond = current.getSeconds() < 10 ? ("0" + current.getSeconds().toString()) : current.getSeconds().toString();

    this.emitIs24Hour();
  }

  clockInterval: any;

  startClock() {
    this.clockInterval = setInterval(() => {
      this.currentTime += 1000;
      this.getTimeValues();
    }, 1000);
  }

  toggle24Hour(): void {
    clearInterval(this.clockInterval);
    this.is24Hour = !this.is24Hour;
    this.getTimeValues();

    this.startClock();
  }

  emitIs24Hour() {
    this.getIs24Hour.emit(this.is24Hour);
  }

  emitIsPM() {
    this.getIsPM.emit(this.isPM);
  }
}
