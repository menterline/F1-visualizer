import { LapTime } from "./models/LapTime.d";
import { LapTimeForGraph } from "./models/lapTimeForGraph.d";

export function RegroupLapTimes(allLapTimes: Array<Array<LapTime>>): LapTimeForGraph[] {
    const numDrivers = allLapTimes.length
    let numLaps = 0

    let regroupedLapTimes: LapTimeForGraph[] = []
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

export function pickRandomColor(): string {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}