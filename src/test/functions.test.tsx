import { ConvertLapTimeToSeconds } from "../functions"

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