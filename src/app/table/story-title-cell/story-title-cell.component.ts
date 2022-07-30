import { Component, Input, OnInit } from '@angular/core';
import { RundownRow } from 'src/app/rundown-row/rundownRow.model';
import { Story } from 'src/app/story/story.model';

@Component({
  selector: 'app-story-title-cell',
  templateUrl: './story-title-cell.component.html',
  styleUrls: ['./story-title-cell.component.css']
})
export class StoryTitleCellComponent implements OnInit {

  @Input() row: RundownRow = new RundownRow(0, "", "", new Story(0, "", "", "", 0, []), "", []);

  constructor() { }

  ngOnInit(): void {
  }

}
