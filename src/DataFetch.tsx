import { getRequest } from "./components/Filters/DataFetch";
import { Driver } from "./models/Driver.d";
import Race from "./models/Race.d";
import { ConvertLapTimeResponse } from "./components/Filters/functions";
import { LapTimesResponse } from "./models/LapTimesResponse.d";
import { LapTime } from "./models/LapTime.d";


async function GetLapTimesForDriver(season: string, race: Race, driver: Driver): Promise<Array<LapTime>> {
    const url = 'http://ergast.com/api/f1/' + season + '/' + race.round + '/drivers/' + driver.driverId + '/laps.json?limit=100'
    const response: LapTimesResponse = await getRequest(url);
    return ConvertLapTimeResponse(response);
}

export async function GetLapTimes(season: string, race: Race, drivers: Array<Driver>): Promise<Array<Array<LapTime>>> {
    let lapTimes: Array<Array<LapTime>> = []
    await Promise.all(drivers.map(async driver => {
        await GetLapTimesForDriver(season, race, driver)
            .then(res => {
                lapTimes.push(res)
            })
    }))
    return lapTimes
}