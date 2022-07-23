export class Command {
    commandId: number;
    commandType: string;

    constructor(
        commandId: number,
        commandType: string,
    ) {
        this.commandId = commandId;
        this.commandType = commandType;
    }

}