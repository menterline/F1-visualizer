import Race from "./Race";
import RaceResults from "./RaceResults";
import RaceResult from './RaceResult'

type RaceData = {
    MRData: {
        RaceTable: {
            Races: Array<Race>
        }
    }
}

export async function getRequest(
  request: RequestInfo
): Promise<any> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export async function GetRacesForSeason(season: string): Promise<Array<Race>> {
    const url = 'http://ergast.com/api/f1/' + season + '.json'
    const races:RaceData = await getRequest(url)
    return races.MRData.RaceTable.Races.map(raceData =>
        new Race(raceData.round, raceData.raceName, raceData.Circuit)
    )
}

export async function GetDriversForRace(season:string, race: Race): Promise<RaceResults> {
    const url = 'http://ergast.com/api/f1/' + season + "/" + race.round + "/results.json"
    type resultsResponse = {
        MRData: {
            RaceTable: {
                Races:[{
                    Results:Array<RaceResult>
                }]
            }
        }
    }
    const response:resultsResponse = await getRequest(url)
    console.log(response.MRData.RaceTable.Races[0].Results)
    return new RaceResults(response.MRData.RaceTable.Races[0].Results);
}