import { Graphic } from "../graphic/graphic.model";
import { Story } from "../story/story.model";

export class RundownRow {
    rowId: number;
    rowType: string;
    rowPageNumber: string;
    rowStory: Story;
    rowSegment: string;
    rowGraphics: Graphic[];

    constructor(
        rowId: number,
        rowType: string,
        rowPageNumber: string,
        rowStory: Story,
        rowSegment: string,
        rowGraphics: Graphic[]
    ) {
        this.rowId = rowId;
        this.rowType = rowType;
        this.rowPageNumber = rowPageNumber;
        this.rowStory = rowStory;
        this.rowSegment = rowSegment;
        this.rowGraphics = rowGraphics;
    }

}