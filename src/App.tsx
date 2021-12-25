import React from 'react';
import './App.scss';
import { Filters } from './components/Filters/Filters';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { GetLapTimes } from './DataFetch';
import Race from './models/Race.d';
import { Driver } from './models/Driver.d';
import Circuit from './models/Circuit.d';
import { LapTime } from './models/LapTime.d';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, Label } from 'recharts';
import { LapTimeForGraph } from './models/lapTimeForGraph.d';
import { pickRandomColor, RegroupLapTimes } from './functions';



function App() {

  const [season, setSeason] = useState<string>("")
  const [race, setRace] = useState<Race>(new Race(-1, "", new Circuit("", "")))
  const [drivers, setDrivers] = useState<Array<Driver>>([])
  const [selectedDrivers, setSelectedDrivers] = useState<Array<Driver>>([])
  const [lapTimes, setLapTimes] = useState<Array<Array<LapTime>>>([])
  const [mappedLapTimes, setMappedLapTimes] = useState<Array<LapTimeForGraph>>([])
  const onSubmit = (season: string, race: Race, selectedDrivers: Array<Driver>) => {
    GetLapTimes(season, race, selectedDrivers).then(result => {
      setLapTimes(result)
      setMappedLapTimes(RegroupLapTimes(result))
    })
  }

  return (
    <div className="App">
      <header>
        This a tool to visualize data from Formula 1 races
      </header>
      <div>
        <Filters
          season={season}
          setSeason={setSeason}
          race={race}
          setRace={setRace}
          drivers={drivers}
          setDrivers={setDrivers}
          selectedDrivers={selectedDrivers}
          setSelectedDrivers={setSelectedDrivers}
        />
        <Button onClick={() => onSubmit(season, race, selectedDrivers)}>SUBMIT</Button>
        <LineChart
          width={1400}
          height={800}
          data={mappedLapTimes}
          margin={{ top: 40, right: 40, bottom: 30, left: 70 }}>
          <CartesianGrid strokeDasharray="3 3"/>
          <Legend verticalAlign="top"/>
          <Tooltip />
          <XAxis dataKey="lapNumber" tickCount={10} type="number">
            <Label value="lap number" position="bottom"/>
          </XAxis>
          <YAxis>
            <Label position="left" value="time" angle={-90}/>
          </YAxis>
          {
            selectedDrivers.map((driver) => {
              return <Line key={driver.driverId} type="monotone" dataKey={(data) => data.driverMap.get(driver.driverId)} stroke={(pickRandomColor())} activeDot={{ r: 8 }} />
            })
          }
        </LineChart>
      </div>
    </div>
  );
}

export default App;
