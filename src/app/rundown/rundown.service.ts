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

  formatFromMilli(milli: number, is12?: boolean): string {
    let str: string = "";
    let is24: boolean = true;
    is12 ? is24 = false : is24 = true;
    let isPM = false;

    let dayStr: number = Math.floor(milli / this.DAY_MILLI);
    let hourStr: number = Math.floor(milli / this.HOUR_MILLI) % 24;
    let minStr: number = Math.floor(milli / this.MIN_MILLI) % 60;
    let secStr: number = Math.floor(milli / this.SEC_MILLI) % 60;

    let dayNum: string = dayStr < 10 ? "0" + dayStr.toString() : dayStr.toString();
    let hourNum: string = hourStr < 10 ? "0" + hourStr.toString() : is24 ? hourStr.toString() : (hourStr - 12).toString();
    let minNum: string = minStr < 10 ? "0" + minStr.toString() : minStr.toString();
    let secNum: string = secStr < 10 ? "0" + secStr.toString() : secStr.toString();

    str = `${dayNum != "00" ? dayNum + ":" : ""}${hourNum != "00" ? hourNum + ":" : dayNum != "00" ? "00:" : ""}${minNum}:${secNum} ${is24 ? "" : isPM ? "PM" : "AM"}`;
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

    let sss: number = this.getSecondsFromString(str);
    let mmm: number = this.getMinutesFromString(str);
    let hhh: number = this.getHoursFromString(str);
    let ddd: number = this.getDaysFromString(str);

    milli = (ddd * this.DAY_MILLI) + (hhh * this.HOUR_MILLI) + (mmm * this.MIN_MILLI) + (sss * this.SEC_MILLI);

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
