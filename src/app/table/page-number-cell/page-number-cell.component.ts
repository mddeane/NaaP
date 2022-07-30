import { RundownRow } from './../../rundown-row/rundownRow.model';
import { Component, Input, OnInit } from '@angular/core';
import { Story } from 'src/app/story/story.model';

@Component({
  selector: 'app-page-number-cell',
  templateUrl: './page-number-cell.component.html',
  styleUrls: ['./page-number-cell.component.css']
})
export class PageNumberCellComponent implements OnInit {

  @Input() row: RundownRow = new RundownRow(0, "", "", new Story(0, "", "", "", 0, []), "", []);

  constructor() { }

  ngOnInit(): void {
  }

}
