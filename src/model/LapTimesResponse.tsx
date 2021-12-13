import { Timing } from "./Timing";

export type LapTimesResponse = {
    MRData: {
        RaceTable: {
            Races:[{
                Laps:Array<{number:number, Timings:Array<Timing>}>
            }]
        }
    }
}