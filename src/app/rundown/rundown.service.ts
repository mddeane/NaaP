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

  constructor() { }

  getRundown(): Observable<Rundown> {
    const rundown = of(this.loadedRundown);
    return rundown;
  }

  getRundownRows(): Observable<RundownRow[]> {
    const rundownRows = of(this.loadedRundown.rundownRows);
    return rundownRows;
  }

}
