import { RundownRow } from "../rundown-row/rundownRow.model";

export class Rundown {
    rundownTitle: string;
    rundownTemplate: string;
    rundownState: string;       // active, inactive, archived
    rundownDate: Date;
    rundownStartTime: number;   // time in milliseconds
    rundownEndTime: number;     // time in milliseconds
    rundownRows: RundownRow[];

    constructor(
        rundownTitle: string,
        rundownTemplate: string,
        rundownState: string,
        rundownDate: Date,
        rundownStartTime: number,
        rundownEndTime: number,
        rundownRows: RundownRow[]
    ) {
        this.rundownTitle = rundownTitle;
        this.rundownTemplate = rundownTemplate;
        this.rundownState = rundownState;
        this.rundownDate = rundownDate;
        this.rundownStartTime = rundownStartTime;
        this.rundownEndTime = rundownEndTime;
        this.rundownRows = rundownRows;
    }


}