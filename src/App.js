import "./App.css";
import {
    Card,
    CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import InfoBox from './components/app-info/InfoBox';
import Map from './components/app-map/Map';
import Table from './components/app-table/Table';
import Graph from './components/app-graph/Graph';
import Header from './components/app-header/Header'
import { sortData } from './functions/function';

function App() {
    const [countries, setCounteries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [table, setTable] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => setCountryInfo(data))
    }, []);

    useEffect(() => {
        (async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then(response => response.json())
                .then(data => {
                    const countries = data.map(country => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2
                        }
                    ));
                    setTable(sortData(data));
                    setCounteries(countries)
                });
        })();
    }, [])

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        const url = countryCode === 'worldwide'
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCountry(countryCode);
                setCountryInfo(data);
            })
    }
    return (
        <div className='app'>
            <div className='app__main'>
                <Header
                    countries={countries}
                    country={country}
                    onCountryChange={onCountryChange}
                />
                <div className="app__stats">
                    <InfoBox
                        title='Coronavirus Cases'
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}

                    />
                    <InfoBox
                        title='Recovered'
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}

                    />
                    <InfoBox
                        title='Deaths'
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </div>
                <Map center={mapCenter} zoom={mapZoom} />
            </div>
            <Card className="app__side">
                <CardContent className="card__container">
                    <div className="card__countriesInfo">
                        <h3>Live Cases by Country</h3>
                        <Table countries={table} />
                    </div>
                    <div className="card__countriesChart">
                        <h3>Worldwide new Cases</h3>
                        <Graph casesType='cases' />
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default App
