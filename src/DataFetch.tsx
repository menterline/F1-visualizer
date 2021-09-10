import { getRequest } from "./Filters/DataFetch";
import { Driver } from "./Filters/Driver";
import Race from "./Filters/Race";
import { ConvertLapTimeResponse, LapTimesResponse } from "./functions";
import { LapTime } from "./LapTime";


async function GetLapTimesForDriver(season:string, race:Race, driver:Driver) : Promise<Array<LapTime>> {
    const url = 'http://ergast.com/api/f1/' + season + '/' + race.round + '/drivers/' + driver.driverId + '/laps.json?limit=100'
    const response:LapTimesResponse = await getRequest(url);
    return ConvertLapTimeResponse(response);
}

export async function GetLapTimes(season:string, race:Race, drivers:Array<Driver>) : Promise<Array<Array<LapTime>>> {
    let lapTimes: Array<Array<LapTime>> = []
    await Promise.all(drivers.map(async driver => {
        await GetLapTimesForDriver(season, race, driver)
            .then(res => {
                lapTimes.push(res)
        })
    }))
    return lapTimes
}