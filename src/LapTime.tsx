export class LapTime {
    driverId:string;
    position:number;
    time:string;

    constructor(
        driverId:string,
        position:number,
        time:string
    ) {
        this.driverId = driverId,
        this.position = position,
        this.time = time
    }
}