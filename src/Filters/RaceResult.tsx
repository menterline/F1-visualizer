import { Driver } from "./Driver"

export class RaceResult {
    position:number;
    points:number;
    Driver:Driver;
    gridStart:number;
    status:string;

    constructor(
        position:number,
        points:number,
        driver:Driver,
        grid:number,
        status:string
    ) {
        this.position = position;
        this.points = points;
        this.Driver = new Driver(
            driver.driverId, 
            driver.permanentNumber, 
            driver.code,
            driver.givenName,
            driver.familyName, 
            driver.dateOfBirth, 
            driver.nationality)
        this.gridStart = grid;
        this.status = status;
    }
}

export default RaceResult