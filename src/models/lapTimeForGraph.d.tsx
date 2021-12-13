import { Driver } from "./Driver.d";
import { LapTime } from "./LapTime.d";

export class LapTimeForGraph {
    lapNumber: number;
    driverMap: Map<string, number>;

    constructor(
        lapNumber: number,
        driverMap: Map<string, number>
    ) {
        this.lapNumber = lapNumber
        this.driverMap = driverMap
    }
}