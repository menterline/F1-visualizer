import { getRequest } from "./Filters/DataFetch";
import { Driver } from "./Filters/Driver";
import Race from "./Filters/Race";
import { ConvertLapTimeToSeconds } from "./functions";
import { LapTime } from "./LapTime";

export async function GetLapTimesForDriver(season:string, race:Race, driver:Driver) : Promise<Array<LapTime>> {
    const url = 'http://ergast.com/api/f1/' + season + '/' + race.round + '/drivers/' + driver.familyName + '/laps.json?limit=100'
    type Timing = {
        driverId:string;
        position:number;
        time:string;
    }
    type lapTimesResponse = {
        MRData: {
            RaceTable: {
                Races:[{
                    Laps:Array<{number:number, Timings:Array<Timing>}>
                }]
            }
        }
    }
    const response:lapTimesResponse = await getRequest(url);
    console.log(response.MRData.RaceTable);
    return response.MRData.RaceTable.Races[0].Laps.map(x => new LapTime(
        x.Timings[0].driverId,
        x.number,
        x.Timings[0].position,
        ConvertLapTimeToSeconds(x.Timings[0].time)
    ));
}
export async function GetLapTimes(season:string, race:Race, drivers:Array<Driver>) : Promise<Array<LapTime>> {
    return GetLapTimesForDriver(season, race, drivers[0])
        .then(res => {
            return res
        })
}