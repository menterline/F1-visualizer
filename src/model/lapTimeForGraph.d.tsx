import { Driver } from "./Driver";
import { LapTime } from "./LapTime";

export class LapTimeForGraph {
    lapNumber:number;
    driverMap:Map<string, number>;

    constructor (
        lapNumber:number,
        driverMap:Map<string, number>
    ) {
        this.lapNumber = lapNumber
        this.driverMap = driverMap
    }
}