import { TEST_ROWS_2 } from './../shared/testRows2';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RundownRow } from '../rundown-row/rundownRow.model';
import { TEST_ROWS } from '../shared/testRows';

@Injectable({
  providedIn: 'root'
})
export class RundownService {

  constructor() { }

  getRundownRows(): Observable<RundownRow[]> {
    const rundownRows = of(TEST_ROWS_2);
    return rundownRows;
  }

}
