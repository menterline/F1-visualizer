import Race from "./Race"
export function GetRaceName(race: Race): string  {
    return race.raceName + ' - ' + race.Circuit.circuitName
}