import { Graphic } from "../graphic/graphic.model";
import { Story } from "../story/story.model";

export class RundownRow {
    rowId: number;
    rowType: string;
    rowPageNumber: string;
    rowStory: Story;
    rowGraphics: Graphic[];

    constructor(
        rowId: number,
        rowType: string,
        rowPageNumber: string,
        rowStory: Story,
        rowGraphics: Graphic[]
    ) {
        this.rowId = rowId;
        this.rowType = rowType;
        this.rowPageNumber = rowPageNumber;
        this.rowStory = rowStory;
        this.rowGraphics = rowGraphics;
    }

}