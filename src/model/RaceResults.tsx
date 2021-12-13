import { Driver } from "./Driver";
import { RaceResult } from "./RaceResult";

export class RaceResults {
    raceResults:Array<RaceResult>

    constructor(raceResults:Array<RaceResult>) {
        this.raceResults = raceResults.map(res => 
            new RaceResult(res.position, res.points, res.Driver, res.gridStart, res.status))
    }

    getDriverList() : Array<Driver>{
        return this.raceResults.map(result => result.Driver)
    }
}

export default RaceResults;