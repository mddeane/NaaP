import { Rundown } from './rundown.model';
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
  rundown: Rundown = new Rundown("", "", "", new Date(), 0, 0, []);

  constructor(private rundownService: RundownService) { }

  ngOnInit(): void {
    this.getRundown();
    this.getRows();
    this.setPageNumbers(this.rundownRows);
    this.estTimeSum = this.getEstTimeSum(this.rundownRows);

  }

  getRundown(): void {
    this.rundownService.getRundown().subscribe(rdData => this.rundown = rdData);
  }

  getRows(): void {
    this.rundownService.getRundownRows().subscribe(rowData => this.rundownRows = rowData);
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

    milli = (ddd * this.dd) + (hhh * this.hh) + (mmm * this.mm) + (sss * this.ss);

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

  estTimeSum: number = 0;

  getEstTimeSum(rows: RundownRow[]): number {
    let sum: number = 0;
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
    if (milli >= 0) {
      overUnderNotNegative = milli;
    } else {
      overUnderNotNegative = milli * (-1);
      overUnderPrefix = "-";
    }

    formattedOverUnder = overUnderPrefix + this.formatFromMilli(overUnderNotNegative);

    return formattedOverUnder;
  }

}
