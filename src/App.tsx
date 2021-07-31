import React from 'react';
import {BarGraph} from './Graphing/Graph';
import './App.scss';
import { Filters } from './Filters/Filters';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { GetLapTimes } from './DataFetch';
import Race from './Filters/Race';
import { Driver } from './Filters/Driver';
import Circuit from './Filters/Circuit';

// const onSubmit = () => {
//   GetLapTimes
// }

function App() {

  const [season, setSeason] = useState<string>("")
  const [race, setRace] = useState<Race>(new Race(-1, "", new Circuit("", "")))
  const [drivers, setDrivers] = useState<Array<Driver>>([])
  const [selectedDrivers, setSelectedDrivers] = useState<Array<Driver>>([])

  console.log(selectedDrivers)
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
        <Button >SUBMIT</Button>
        <BarGraph/>
      </div>
    </div>
  );
}

export default App;
