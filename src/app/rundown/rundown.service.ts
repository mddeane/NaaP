import { TEST_ROWS_2 } from './../shared/testRows2';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RundownRow } from '../rundown-row/rundownRow.model';
import { TEST_ROWS } from '../shared/testRows';
import { Rundown } from './rundown.model';
import { TEST_RUNDOWN } from '../shared/testRundown';

@Injectable({
  providedIn: 'root'
})
export class RundownService {

  loadedRundown: Rundown = TEST_RUNDOWN;

  estTimeSum: number = 0;

  frontTimes: number[] = [];
  endTimes: number[] = [];

  startTime: number = 0;
  endTime: number = 0;

  constructor() { }

  getRundown(): Observable<Rundown> {
    const rundown = of(this.loadedRundown);
    return rundown;
  }

  getRundownRows(): Observable<RundownRow[]> {
    const rundownRows = of(this.loadedRundown.rundownRows);
    return rundownRows;
  }

  // *************************************************

  SEC_MILLI: number = 1000;
  MIN_MILLI: number = 60 * this.SEC_MILLI;
  HOUR_MILLI: number = 60 * this.MIN_MILLI;
  DAY_MILLI: number = 24 * this.HOUR_MILLI;

  formatFromMilli(milli: number, is24?: boolean): string {
    let str: string = "";
    //let is24Flag: boolean = is24 ? is24 : false;
    let isPM: boolean = false;

    let dayNum: number = Math.floor(milli / this.DAY_MILLI);
    let hourNum: number = Math.floor(milli / this.HOUR_MILLI) % 24;
    let minNum: number = Math.floor(milli / this.MIN_MILLI) % 60;
    let secNum: number = Math.floor(milli / this.SEC_MILLI) % 60;

    let dayStr: string = dayNum < 10 ? "0" + dayNum.toString() : dayNum.toString();
    let hourStr: string = hourNum < 10 ? "0" + hourNum.toString() : is24 ? hourNum.toString() : (hourNum - 12).toString();
    let minStr: string = minNum < 10 ? "0" + minNum.toString() : minNum.toString();
    let secStr: string = secNum < 10 ? "0" + secNum.toString() : secNum.toString();
    let amPm: string = isPM ? "PM" : "AM";

    str = `${dayStr != "00" ? dayStr + ":" : ""}${hourStr != "00" ? hourStr + ":" : dayStr != "00" ? "00:" : ""}${minStr}:${secStr}`;
    return str;
  }

  /*
    This function takes the input for estimated time and returns the milliseconds equivalent.
    It calls checkRegEx() to validate.
  */
  formatToMilli(str: string): number {

    let milli: number = 0;

    let ok: boolean = this.checkRegEx(str);

    if (!ok) {
      return 0;
    }

    let secNum: number = this.getSecondsFromString(str);
    let minNum: number = this.getMinutesFromString(str);
    let hourNum: number = this.getHoursFromString(str);
    let dayNum: number = this.getDaysFromString(str);

    milli = (dayNum * this.DAY_MILLI) + (hourNum * this.HOUR_MILLI) + (minNum * this.MIN_MILLI) + (secNum * this.SEC_MILLI);

    return milli;
  }

  /*
    This function checks the estimated time input to make sure it 
    is only digits (0-9), period (.), or colon (:).
    Existence of other characters returns 0. 
  */
  checkRegEx(str: string): boolean {

    const re = /^[0-9\.\:]+$/;

    const ok = re.test(str);
    return ok;
  }

  getAMPMfromMilli(milli: number): string {
    let amOrPm: string = "";
    let date = new Date(milli);
    amOrPm = date.getHours() >= 12 ? "PM" : "AM"
    return amOrPm;
  }

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


  getEstTimeSum(rows: RundownRow[]): number {
    let sum: number = 0;
    console.log(rows);
    for (let row of rows) {
      sum += row.rowStory.storyEst;
    }
    console.log("sum: " + sum);
    return sum;
  }

  formatOverUnderFromMilli(milli: number): string {
    let formattedOverUnder: string = "";
    let overUnderNotNegative: number = 0;
    let overUnderPrefix: string = "";
    if (milli > 0) {
      overUnderNotNegative = milli;
      overUnderPrefix = "-";
    } else if (milli == 0) {
      overUnderNotNegative = milli;
      overUnderPrefix = "";
    } else {
      overUnderNotNegative = milli * (-1);
      overUnderPrefix = "+";
    }

    formattedOverUnder = overUnderPrefix + this.formatFromMilli(overUnderNotNegative);

    return formattedOverUnder;
  }

  public inputs: HTMLInputElement[] = [];

  addInput(el: HTMLInputElement): void {
    this.inputs.push(el);
  }

  getFrontTimes(rd: Rundown): number[] {
    let frontTimes: number[] = [];
    let rows: RundownRow[] = rd.rundownRows;

    frontTimes[0] = rd.rundownStartTime;


    for (let i = 1; i < rows.length; i++) {
      frontTimes.push(frontTimes[i - 1] + rows[i - 1].rowStory.storyEst);
      console.log("fronttime: " + frontTimes[i])
    }
    return frontTimes;
  }

  getEndTimes(rd: Rundown): number[] {
    let endTimes: number[] = [];
    let rows: RundownRow[] = rd.rundownRows;

    endTimes[0] = rd.rundownEndTime - rows[0].rowStory.storyEst;
    // endTimes[rows.length - 1] = rd.rundownEndTime;

    for (let i = 1; i < rows.length; i++) {
      endTimes.push(endTimes[i - 1] - rows[i].rowStory.storyEst);
    }
    return endTimes;
  }

  setFrontEndTimes(rundown: Rundown): void {

    this.estTimeSum = this.getEstTimeSum(rundown.rundownRows);
    this.frontTimes = this.getFrontTimes(rundown);
    this.endTimes = this.getEndTimes(rundown);
    this.startTime = rundown.rundownStartTime;
    this.endTime = rundown.rundownEndTime;

  }
}
