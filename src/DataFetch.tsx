import { getRequest } from "./Filters/DataFetch";
import { Driver } from "./Filters/Driver";
import Race from "./Filters/Race";
import { LapTime } from "./LapTime";

export async function GetLapTimesForDriver(season:string, race:Race, driver:Driver) : Promise<Array<LapTime>> {
    const url = 'http://ergast.com/api/f1/' + season + '/' + race.round + '/drivers/' + driver.familyName + '/results.json?limit=100'
    type lapTimesResponse = {
        MRData: {
            RaceTable: {
                Races:[{
                    Laps:Array<LapTime>
                }]
            }
        }
    }
    const response:lapTimesResponse = await getRequest(url);
    return response.MRData.RaceTable.Races[0].Laps;
}
export async function GetLapTimes(season:string, race:Race, drivers:Array<Driver>) : Promise<Array<any>> {
    const result = await  drivers.map(driver => { return 
        GetLapTimesForDriver(season, race, driver)
            .then(res => {
                return res
            })
    })
    return result;
}