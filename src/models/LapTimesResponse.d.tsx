import { Timing } from "./Timing.d";

export type LapTimesResponse = {
    MRData: {
        RaceTable: {
            Races: [{
                Laps: Array<{ number: number, Timings: Array<Timing> }>
            }]
        }
    }
}