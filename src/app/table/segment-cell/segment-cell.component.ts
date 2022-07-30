import { RundownService } from './../../rundown/rundown.service';
import { Graphic } from './../../../../../proj-v2/src/app/models/graphic.model';
import { RundownRow } from './../../rundown-row/rundownRow.model';
import { Rundown } from './../../rundown/rundown.model';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Story } from 'src/app/story/story.model';

@Component({
  selector: 'app-segment-cell',
  templateUrl: './segment-cell.component.html',
  styleUrls: ['./segment-cell.component.css']
})
export class SegmentCellComponent implements OnInit {

  @Input() row: RundownRow = new RundownRow(0, "", "", new Story(0, "", "", "", 0, []), "", []);

  // inputEl: any;

  constructor(public rundownService: RundownService, private el: ElementRef) { }

  ngOnInit(): void {
    //    this.addInput();
  }

  addInput(): void {
    // this.rundownService.addInput(this.el.nativeElement.querySelector("#segmentInput"));
    // console.log(this.rundownService.inputs[0]);
  }

}
