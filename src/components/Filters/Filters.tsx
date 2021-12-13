import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import './Filters.scss'
import { GetDriversForRace, GetRacesForSeason } from './DataFetch';
import { GetRaceName } from './functions';
import Race from '../../models/Race.d';
import { Driver } from '../../models/Driver.d';

type FiltersProps = {
    season: string;
    setSeason: Function;
    race: Race;
    setRace: Function;
    drivers: Array<Driver>;
    setDrivers: Function;
    selectedDrivers: Array<Driver>;
    setSelectedDrivers: Function;
}

export function Filters(props: FiltersProps) {
    const [raceOptions, setRaceOptions] = useState<Array<Race>>([])
    return (
        <div className="filtersContainer">
            <Grid container>
                <Grid item xs={12} sm={4}>
                    <Autocomplete className="filter"
                        options={["2019", "2020", "2021"]}
                        getOptionSelected={(option, value) => {
                            if (value === "" || value === option) { return true; }
                            return false;
                        }}
                        onChange={(e, value) => {
                            if (value != null) {
                                props.setSeason(value);
                                GetRacesForSeason(value).then(racesForSeason =>
                                    setRaceOptions(racesForSeason)
                                )
                            }
                            else {
                                props.setSeason("")
                            }

                        }}
                        value={props.season}
                        renderInput={(params) => <TextField {...params} label="Season" variant="outlined" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete className="filter"
                        options={raceOptions}
                        disabled={raceOptions.length <= 0}
                        getOptionLabel={(option) => GetRaceName(option)}
                        onChange={(e, value) => {
                            props.setRace(value)
                            if (value != null) {
                                GetDriversForRace(props.season, value).then(results => {
                                    props.setDrivers(results.getDriverList())
                                }
                                )
                            }
                            else {
                                props.setDrivers([])
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Race" variant="outlined" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete className="filter"
                        multiple
                        options={props.drivers}
                        getOptionLabel={(option) => option.getDriverName()}
                        onChange={(e, value) => {
                            props.setSelectedDrivers(value)
                        }}
                        renderInput={(params) => <TextField {...params} label="Drivers" variant="outlined" />}
                    />
                </Grid>


            </Grid>
        </div>
    );
}