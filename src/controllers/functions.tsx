import Race from "../model/Race"
import { LapTime } from "../model/LapTime";
import { LapTimesResponse } from "../model/LapTimesResponse";

export function GetRaceName(race: Race): string  {
    return race.raceName + ' - ' + race.Circuit.circuitName
}

export function ConvertLapTimeToSeconds(lapTime:string): number {
    const parts = lapTime.split(':')
    return 60*Number(parts[0]) + Number(parts[1]);
}

export function ConvertLapTimeResponse(response:LapTimesResponse) : Array<LapTime> {
    return response.MRData.RaceTable.Races[0].Laps.map(x => new LapTime(
        x.Timings[0].driverId,
        x.number,
        x.Timings[0].position,
        ConvertLapTimeToSeconds(x.Timings[0].time)
    ));
}