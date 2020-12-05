import React from 'react';
import {
    MenuItem,
    FormControl,
    Select
} from "@material-ui/core";
import './Header.css'

function Header({ countries, onCountryChange, country }) {


    return (
        <>
            <div className='header'>
                <h1>COVID-19 TRACKER</h1>
                <FormControl className='header__dropdown'>
                    <Select
                        variant="outlined"
                        value={country}
                        onChange={e => onCountryChange(e)}
                    >
                        <MenuItem value='worldwide'>Worldwide</MenuItem>
                        {countries.map((country, index) => (
                            <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default Header
