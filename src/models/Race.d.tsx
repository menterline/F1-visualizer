import Circuit from "./Circuit.d";

export class Race {
    round: number;
    raceName: string;
    Circuit: Circuit;

    constructor(
        round: number,
        raceName: string,
        Circuit: Circuit
    ) {
        this.round = round
        this.raceName = raceName
        this.Circuit = Circuit
    }
}

export default Race
