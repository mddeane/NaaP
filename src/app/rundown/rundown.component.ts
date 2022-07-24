import { RundownRow } from './../rundown-row/rundownRow.model';
import { RundownService } from './rundown.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.css']
})
export class RundownComponent implements OnInit {

  rundownRows: RundownRow[] = [];

  constructor(private rundownService: RundownService) { }

  ngOnInit(): void {
    this.getRows();
  }

  getRows(): void {
    this.rundownService.getRundownRows().subscribe(rowData => this.rundownRows = rowData);
  }

  /*
    This function takes milliseconds and converts it to 
    the format 0:00 as a string.
  */

  convertTime(milli: number): string {
    let returnTime: string = "";
    let hours: number;
    let minutes: number;
    let seconds: number;

    let oneSecond: number = 1000;
    let oneMinute: number = 60 * oneSecond;
    let oneHour: number = 60 * oneMinute;
    let oneDay: number = 24 * oneHour;

    if (milli < oneMinute) {
      seconds = milli / 1000;
      if (seconds < 10) {
        returnTime = "0:0" + seconds.toString();
      } else {
        returnTime = "0:" + seconds.toString();
      }
    } else if (milli < oneHour) {
      minutes = Math.floor(milli / oneMinute);
      returnTime = minutes + ":";

      seconds = (milli % oneMinute) / 1000;
      if (seconds < 10) {
        returnTime = returnTime + "0" + seconds.toString();
      } else {
        returnTime = returnTime + seconds.toString();
      }

    } else {

      returnTime = "temp";
    }
    return returnTime;
  }

  /* 
    This function takes the user input, validates it, and converts it into
    the equivalent milliseconds or zero (if not valid).
    The return value is sent to convertTime() function.
  */
  inputTime(timeString: string): number {
    let returnNumber = 0;
    let timeStr = timeString;

    if (timeString.includes(":")) {
      let timeSplit = timeString.split(":");
      console.log(timeSplit);

      let timeSplitLength = timeSplit.length;
      if (timeSplitLength > 0) {
        if (timeSplitLength === 1) {
          timeStr = timeSplit[0];
        } else {
          let cleanSplit: string[] = [];
          let noZero: boolean = false;
          for (let i = 0; i < timeSplitLength; i++) {
            if (noZero === false) {
              if (timeSplit[i] !== '' && timeSplit[i] !== '0' && timeSplit[i] !== '00') {
                noZero = true;
                cleanSplit.push(timeSplit[i]);
              }
            } else {
              let cleanZero: string = "";
              if (timeSplit[i] !== '' || timeSplit[i] !== '0' || timeSplit[i] !== '00') {
                cleanSplit.push("0");
              } else {
                cleanSplit.push(timeSplit[i]);
              }
            }
          }
          if (cleanSplit.length === 1) {
            timeStr = cleanSplit[0];
          } else if (cleanSplit.length === 2) {
            //            if (Number.isInteger(cleanSplit[0]) && Number.isInteger(cleanSplit[1])) {
            let sum: number = (parseInt(cleanSplit[0]) * 60) + parseInt(cleanSplit[1]);
            console.log("sum: " + sum);
            timeStr = sum.toString();
          } else {
            timeStr = "0";
          }
          console.log("cleanSplit: " + cleanSplit);
        }

      }
    }
    console.log("timeStr: " + timeStr);
    if (parseInt(timeStr)) {      // if the input is an actual number

      let num = parseInt(timeStr);

      if (num >= 0) {           // make sure it is positive
        // if (num < 1000) {
        returnNumber = num * 1000;
        // } else {
        // returnNumber = num;
        // }
      } else {
        console.log("else");
        returnNumber = 0;
      }
    } else {
      returnNumber = -1;
    }
    return returnNumber;
  }
}
