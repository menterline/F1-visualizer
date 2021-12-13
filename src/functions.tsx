import { LapTime } from "./model/LapTime";
import { LapTimeForGraph } from "./model/lapTimeForGraph.d";

/*
take array of laptime arrays and convert to
single array of form
{
    lapNumber:
    lapTimes:[time1, time2]
    ...
*/
export function RegroupLapTimes (allLapTimes: Array<Array<LapTime>> ): LapTimeForGraph[] {
    const numDrivers = allLapTimes.length
    let numLaps = 0

    let regroupedLapTimes:LapTimeForGraph[] = []
    allLapTimes.map(driverLapTime => {
        if (driverLapTime.length > numLaps) {
            numLaps = driverLapTime.length
        }
    })
    for (let i = 0; i < numLaps; i++) {
        let driverLapTime = new Map<string, number>()
        allLapTimes.map(driver => {
            driverLapTime.set(driver[i].driverId, driver[i].time)
        })
        regroupedLapTimes.push(new LapTimeForGraph(i, driverLapTime))
    }
    return regroupedLapTimes
}