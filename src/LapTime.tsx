export class LapTime {
    driverId:string;
    lapNumber:number;
    position:number;
    time:number;

    constructor(
        driverId:string,
        lapNumber:number,
        position:number,
        time:number
    ) {
        this.driverId = driverId;
        this.lapNumber = lapNumber;
        this.position = position;
        this.time = time;
    }
}