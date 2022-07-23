import { Command } from "../command/command.model";
import { Graphic } from "../graphic/graphic.model";
import { Story } from "../story/story.model";

export class Production {
    productionId: number;
    productionStory: Story;         // the story the production commands are linked to
    productionGraphics: Graphic[];  // graphics in the story
    productionScript: string;       // if the production script does not match story script, sends alert that something changed
    productionCommands: Command[];  // these will be written as text in the script, then collected after in an array, maybe use <* *>

    constructor(
        productionId: number,
        productionStory: Story,
        productionGraphics: Graphic[],
        productionScript: string,
        productionCommands: Command[]
    ) {
        this.productionId = productionId;
        this.productionStory = productionStory;
        this.productionGraphics = productionGraphics;
        this.productionScript = productionScript;
        this.productionCommands = productionCommands;
    }

}