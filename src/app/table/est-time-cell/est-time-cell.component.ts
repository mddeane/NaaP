import { Rundown } from './../../rundown/rundown.model';
import { RundownService } from './../../rundown/rundown.service';
import { Component, Input, OnInit } from '@angular/core';
import { RundownRow } from 'src/app/rundown-row/rundownRow.model';
import { Story } from 'src/app/story/story.model';

@Component({
  selector: 'app-est-time-cell',
  templateUrl: './est-time-cell.component.html',
  styleUrls: ['./est-time-cell.component.css']
})
export class EstTimeCellComponent implements OnInit {

  @Input() row: RundownRow = new RundownRow(0, "", "", new Story(0, "", "", "", 0, []), "", []);
  @Input() rundownRows: RundownRow[] = [];
  @Input() rundown: Rundown = new Rundown("", "", "", new Date(), 0, 0, []);

  constructor(public rundownService: RundownService) { }

  estTimeSum: number = 0;

  ngOnInit(): void {
  }


  //   this.estTimeSum = this.getEstTimeSum(this.rundownRows);

  // getEstTimeSum(rows: RundownRow[]): number {
  //   let sum: number = 0;
  //   for (let row of rows) {
  //     sum += row.rowStory.storyEst;
  //   }
  //   console.log("sum: " + sum);
  //   return sum;
  // }
}
