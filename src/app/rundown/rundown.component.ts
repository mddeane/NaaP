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
    let timeStr: string = timeString;

    if (timeString.includes(":")) {
      // timeStr = this.timeWithColonReturnInteger(timeString).toString();

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

  testInput(inputStr: string): number {
    let returnNum: number = 0;
    if (inputStr.includes(":")) {
      returnNum = this.timeWithColonReturnInteger(inputStr);
    }
    return returnNum;
  }
  //example input: 1:30
  // example output: 90
  timeWithColonReturnInteger(numberWithColons: string): number {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("numberWithColons: " + numberWithColons);
    let numberWithoutColons: number = 0;  // this is the return value as an integer
    let numberSplitReverse = numberWithColons.split(":").reverse(); // this splits the string into elements by colons
    let numberSplitReverseLength = numberSplitReverse.length; // how many elements in array; only interested in first three (if there are three)

    // replace "" with "0"
    for (let i = 0; i < numberSplitReverseLength; i++) {
      if (numberSplitReverse[i] === "" || !(parseInt(numberSplitReverse[i]))) {
        numberSplitReverse[i] = "0";
      }
    }

    // declare values that will be added to return final value
    //start with zero in case no new value provided
    let hrs: number = 0;
    let mins: number = 0;
    let secs: number = 0;

    // console.log(": " + );

    console.log("numberSplitReverse: " + numberSplitReverse);

    if (numberSplitReverseLength > 0) { // verify elements exist
      for (let i = 0; i < numberSplitReverseLength; i++) {
        // let numStr: string = '0';
        // if (numberSplitReverse[i]) {
        //   numStr = numberSplitReverse[i];
        //   console.log("yes: " + numberSplitReverse[i]);
        //   console.log("numStr: " + numStr);
        // } else {
        //   console.log("not: " + numberSplitReverse[i]);
        //   console.log("numStr: " + numStr);
        // }
        if (i === 0) {  // since array is reversed, seconds are first
          // if (Number.isInteger(parseInt(numberSplitReverse[0]))) { // verify that parsed string is a number
          secs = parseInt(numberSplitReverse[0]); // assign seconds value (seconds should always exist)
          // } else {
          //   return 0; // return zero if not a number
          // }
        }

        if (i === 1) {         // same process for minutes and hours if they exist
          // if (Number.isInteger(parseInt(numberSplitReverse[1]))) {
          mins = parseInt(numberSplitReverse[1]);
          // } else {
          //   return 0;
          // }
        }

        if (i === 2) {
          // if (Number.isInteger(parseInt(numberSplitReverse[2]))) {
          hrs = parseInt(numberSplitReverse[2]);
          // } else {
          //   return 0;
          // }
        }
      }
    } else {
      numberWithoutColons = 0;  // return zero if no elements
    }

    numberWithoutColons = (hrs * 60 * 60) + (mins * 60) + secs; // calculate total seconds
    console.log("numberWithoutColons: " + numberWithoutColons)
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");

    return numberWithoutColons; // return total seconds or zero if not a number
  }

  formatTime(totalSeconds: number): string {
    console.log("***********************************************");
    console.log("formatTime");
    console.log("totalSeconds: " + totalSeconds);

    let formattedTime: string = "";

    if (totalSeconds < 10) {
      formattedTime = "0:0" + totalSeconds;
    } else if (totalSeconds < 60) {
      formattedTime = "0:" + totalSeconds;
    } else {
      formattedTime = totalSeconds.toString()
    }
    console.log("formattedTime: " + formattedTime);
    console.log("***********************************************");

    return formattedTime;
  }

  ss: number = 1000;
  mm: number = 60 * this.ss;
  hh: number = 60 * this.mm;
  dd: number = 24 * this.hh;

  formatFromMilli(milli: number): string {
    let str: string = "";

    let ddd: number = Math.floor(milli / this.dd);
    let hhh: number = Math.floor(milli / this.hh) % 24;
    let mmm: number = Math.floor(milli / this.mm) % 60;
    let sss: number = Math.floor(milli / this.ss) % 60;

    let dddd: string = ddd < 10 ? "0" + ddd.toString() : ddd.toString();
    let hhhh: string = hhh < 10 ? "0" + hhh.toString() : hhh.toString();
    let mmmm: string = mmm < 10 ? "0" + mmm.toString() : mmm.toString();
    let ssss: string = sss < 10 ? "0" + sss.toString() : sss.toString();

    str = `${dddd != "00" ? dddd + ":" : ""}${hhhh != "00" ? hhhh + ":" : dddd != "00" ? "00:" : ""}${mmmm}:${ssss}`;
    return str;
  }

  formatToMilli(str: string): number {

    let milli: number = 0;

    let sss: number = this.getSecondsFromString(str);
    let mmm: number = this.getMinutesFromString(str);
    let hhh: number = this.getHoursFromString(str);
    let ddd: number = this.getDaysFromString(str);

    milli = (ddd * this.dd) + (hhh * this.hh) + (mmm * this.mm) + (sss * this.ss);

    return milli;
  }

  testRegEx(str: string): boolean {

    const re = /[^0-9:\.]/g;
    const ok = re.test(str);
    return ok;
  }
  testConvert(str: string): number {
    return parseInt(str);
  }
  testNumber: number = 30000;
  testString: string = "01:30";

  getSecondsFromString(str: string): number {
    let sss: number = 0;

    let strSplitArray: string[] = [];
    let strFilteredArray: string[] = [];
    let strReverseArray: string[] = [];

    if (str.includes(":")) {
      strSplitArray = str.split(":");
    } else if (str.includes(".")) {
      strSplitArray = str.split(".");
    } else if (parseInt(str)) {
      strSplitArray = [str];
    } else {
      strSplitArray = ["0"];
    }

    strFilteredArray = strSplitArray.filter(el => { return el; });
    strReverseArray = strFilteredArray.reverse();
    if (strReverseArray.length > 0) {
      if (parseInt(strReverseArray[0])) {
        sss = parseInt(strReverseArray[0]);
      } else {
        sss = 0;
      }
    }
    return sss;
  }

  getMinutesFromString(str: string): number {
    let mmm: number = 0;

    let strSplitArray: string[] = [];
    let strFilteredArray: string[] = [];
    let strReverseArray: string[] = [];

    if (str.includes(":")) {
      strSplitArray = str.split(":");
    } else if (str.includes(".")) {
      strSplitArray = str.split(".");
    } else {
      strSplitArray = ["0"];
    }

    strFilteredArray = strSplitArray.filter(el => { return el; });
    strReverseArray = strFilteredArray.reverse();

    if (strReverseArray.length > 1) {
      if (parseInt(strReverseArray[1])) {
        mmm = parseInt(strReverseArray[1]);
      } else {
        mmm = 0;
      }
    }
    return mmm;
  }

  getHoursFromString(str: string): number {
    let hhh: number = 0;

    let strSplitArray: string[] = [];
    let strFilteredArray: string[] = [];
    let strReverseArray: string[] = [];

    if (str.includes(":")) {
      strSplitArray = str.split(":");
    } else if (str.includes(".")) {
      strSplitArray = str.split(".");
    } else {
      strSplitArray = ["0"];
    }

    strFilteredArray = strSplitArray.filter(el => { return el; });
    strReverseArray = strFilteredArray.reverse();

    if (strReverseArray.length > 2) {
      if (parseInt(strReverseArray[2])) {
        hhh = parseInt(strReverseArray[2]);
      } else {
        hhh = 0;
      }
    }
    return hhh;
  }

  getDaysFromString(str: string): number {
    let ddd: number = 0;

    let strSplitArray: string[] = [];
    let strFilteredArray: string[] = [];
    let strReverseArray: string[] = [];

    if (str.includes(":")) {
      strSplitArray = str.split(":");
    } else if (str.includes(".")) {
      strSplitArray = str.split(".");
    } else {
      strSplitArray = ["0"];
    }

    strFilteredArray = strSplitArray.filter(el => { return el; });
    strReverseArray = strFilteredArray.reverse();

    if (strReverseArray.length > 3) {
      if (parseInt(strReverseArray[3])) {
        ddd = parseInt(strReverseArray[3]);
      } else {
        ddd = 0;
      }
    }
    return ddd;
  }

}
