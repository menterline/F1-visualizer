import React from 'react';
import './App.scss';
import { Filters } from './view/Filters';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { GetLapTimes } from './DataFetch';
import Race from './model/Race';
import { Driver } from './model/Driver';
import Circuit from './model/Circuit';
import { LapTime } from './model/LapTime';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { LapTimeForGraph } from './model/lapTimeForGraph.d';
import { RegroupLapTimes } from './functions';



function App() {

  const [season, setSeason] = useState<string>("")
  const [race, setRace] = useState<Race>(new Race(-1, "", new Circuit("", "")))
  const [drivers, setDrivers] = useState<Array<Driver>>([])
  const [selectedDrivers, setSelectedDrivers] = useState<Array<Driver>>([])
  const [lapTimes, setLapTimes] = useState<Array<Array<LapTime>>>([])
  const [mappedLapTimes, setMappedLapTimes] = useState<Array<LapTimeForGraph>>([])
  const onSubmit = (season:string, race:Race, selectedDrivers:Array<Driver>) => {
    GetLapTimes(season, race, selectedDrivers).then(result => 
      {
        setLapTimes(result)
        setMappedLapTimes(RegroupLapTimes(result))
      }
    )
  }

  console.log(mappedLapTimes)
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
        <Button onClick={() => onSubmit(season, race,selectedDrivers)}>SUBMIT</Button>
        <LineChart 
          width={1400} 
          height={800} 
          data={mappedLapTimes}
          margin={{top:40, right:40, bottom:20, left:20}}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="lapNumber" label="lap number"/>
            <YAxis label="time"/>
            {
              selectedDrivers.map((driver) => {
                return <Line key={driver.driverId} type="monotone" dataKey={(data) => data.driverMap.get(driver.driverId)} stroke="#8884d8" activeDot={{r: 8}}/>
              })
            }
        </LineChart>
      </div>
    </div>
  );
}

export default App;
