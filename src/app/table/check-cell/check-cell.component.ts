import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-cell',
  templateUrl: './check-cell.component.html',
  styleUrls: ['./check-cell.component.css']
})
export class CheckCellComponent implements OnInit {

  @Input() tableRow: any;

  constructor() { }

  ngOnInit(): void {
  }

}
