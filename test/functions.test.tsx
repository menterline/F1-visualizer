import { ConvertLapTimeToSeconds } from "../src/components/Filters/functions"
import Circuit from "../src/models/Circuit.d";
import Race from "../src/models/Race.d"
import { GetRaceName } from "../src/components/Filters/functions";

describe('GetRaceName', () => {
    it('Gets name for race', () => {
        const testRace = new Race(1, "testRace", new Circuit("circuit1", "testCircuit"));
        expect(GetRaceName(testRace)).toEqual("testRace - testCircuit")
    })
})

describe('ConvertLapTimeToSeconds', () => {
    it('converts 1 minute', () => {
        expect(ConvertLapTimeToSeconds('1:00.000')).toEqual(60)
    })
    it('converts less than 1 minute', () => {
        expect(ConvertLapTimeToSeconds('0:30.000')).toEqual(30)
    })
    it('converts more than 1 minute', () => {
        expect(ConvertLapTimeToSeconds('1:30.000')).toEqual(90)
    })
    it('converts with partial seconds', () => {
        expect(ConvertLapTimeToSeconds('1:30.123')).toEqual(90.123)
    })
})
