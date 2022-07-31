import { Rundown } from './rundown.model';
import { RundownRow } from './../rundown-row/rundownRow.model';
import { RundownService } from './rundown.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.css']
})
export class RundownComponent implements OnInit {

  rundownRows: RundownRow[] = [];
  rundown: Rundown = new Rundown("", "", "", new Date(), 0, 0, []);

  // estTimeSum: number = 0;

  // frontTimes: number[] = [];
  // endTimes: number[] = [];

  // startTime: number = 0;
  // endTime: number = 0;

  constructor(public rundownService: RundownService, public alertService: AlertService) { }

  ngOnInit(): void {
    this.getRundown();
    this.getRows();
    this.setPageNumbers(this.rundownRows);
    this.rundownService.setFrontEndTimes(this.rundown);
    console.log("length: " + this.rundownService.inputs.length);
    for (let inp of this.rundownService.inputs) {
      console.log("inputs: " + inp);
    }
    for (let row of this.rundownRows) {
      console.log("est: " + row.rowStory.storyEst);
    }

  }

  getRundown(): void {
    this.rundownService.getRundown().subscribe(rdData => this.rundown = rdData);
  }

  getRows(): void {
    this.rundownService.getRundownRows().subscribe(rowData => this.rundownRows = rowData);
  }

  // getFrontTimes(rd: Rundown): number[] {
  //   let frontTimes: number[] = [];
  //   let rows: RundownRow[] = rd.rundownRows;

  //   frontTimes[0] = rd.rundownStartTime;


  //   for (let i = 1; i < rows.length; i++) {
  //     frontTimes.push(frontTimes[i - 1] + rows[i - 1].rowStory.storyEst);
  //     console.log("fronttime: " + frontTimes[i])
  //   }
  //   return frontTimes;
  // }

  // getEndTimes(rd: Rundown): number[] {
  //   let endTimes: number[] = [];
  //   let rows: RundownRow[] = rd.rundownRows;

  //   endTimes[0] = rd.rundownEndTime - rows[0].rowStory.storyEst;
  //   // endTimes[rows.length - 1] = rd.rundownEndTime;

  //   for (let i = 1; i < rows.length; i++) {
  //     endTimes.push(endTimes[i - 1] - rows[i].rowStory.storyEst);
  //   }
  //   return endTimes;
  // }

  SEC_MILLI: number = 1000;
  MIN_MILLI: number = 60 * this.SEC_MILLI;
  HOUR_MILLI: number = 60 * this.MIN_MILLI;
  DAY_MILLI: number = 24 * this.HOUR_MILLI;

  formatFromMilli(milli: number): string {
    let str: string = "";

    let dayStr: number = Math.floor(milli / this.DAY_MILLI);
    let hourStr: number = Math.floor(milli / this.HOUR_MILLI) % 24;
    let minStr: number = Math.floor(milli / this.MIN_MILLI) % 60;
    let secStr: number = Math.floor(milli / this.SEC_MILLI) % 60;

    let dayNum: string = dayStr < 10 ? "0" + dayStr.toString() : dayStr.toString();
    let hourNum: string = hourStr < 10 ? "0" + hourStr.toString() : hourStr.toString();
    let minNum: string = minStr < 10 ? "0" + minStr.toString() : minStr.toString();
    let secNum: string = secStr < 10 ? "0" + secStr.toString() : secStr.toString();

    str = `${dayNum != "00" ? dayNum + ":" : ""}${hourNum != "00" ? hourNum + ":" : dayNum != "00" ? "00:" : ""}${minNum}:${secNum}`;
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

  setPageNumbers(rows: RundownRow[]): void {
    let totalBreaks: number = 0;

    let blockLetters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    for (let i = 0; i < this.rundownRows.length; i++) {
      this.rundownRows[i].rowPageNumber = blockLetters[totalBreaks] + (i + 1);
      console.log(this.rundownRows[i].rowPageNumber);
      if (this.rundownRows[i].rowType == "BREAK") {
        ++totalBreaks;
      }
    }
  }

  is24: boolean = false;
  isPM: boolean = false;

  change24Hour(is24HrFlag: boolean): boolean {
    return is24HrFlag;
  }

  changePM(isPMFlag: boolean): boolean {
    return isPMFlag;
  }
}
