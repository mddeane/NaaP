import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {


  currentDayOfWeek: string = "";
  currentMonth: string = "";
  currentDate: string = "00";
  currentYear: string = "0000";

  currentHour: string = "00";
  currentMinute: string = "00";
  currentSecond: string = "00";
  isPM: boolean = false;

  daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  currentGlobal: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getDate();
  }

  getDate(): void {
    let currentMilli: number = Date.now();

    let current: Date = new Date(currentMilli);
    this.currentGlobal = currentMilli;

    this.currentDayOfWeek = this.daysOfWeek[current.getDay()];
    this.currentMonth = this.months[current.getMonth()];
    this.currentDate = current.getDate().toString();
    this.currentYear = current.getFullYear().toString();
  }

}
