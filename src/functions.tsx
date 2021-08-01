export function ConvertLapTimeToSeconds(lapTime:string): number {
    const parts = lapTime.split(':')
    return 60*Number(parts[0]) + Number(parts[1]);
}