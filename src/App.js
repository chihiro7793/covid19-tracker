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
import numeral from 'numeral';

function App() {
    const [countries, setCounteries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [table, setTable] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 32, lng: 53, zoom: 2 });
    const [infoType, setInfoType] = useState('cases');
    const [data, setData] = useState([]);

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
                    const countries = data.map(country => {
                        return (
                            {
                                name: country.country,
                                value: country.countryInfo.iso2
                            }
                        )
                    });
                    setTable(sortData(data));
                    setData(data);
                    setCounteries(countries);
                    console.log(data);
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
                if (countryCode === 'worldwide') {
                    setMapCenter({ lat: 32, lng: 53, zoom: 2 });
                } else {
                    setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long, zoom: 3 });

                }
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
                        status={'red'}
                        active={infoType === 'cases'}
                        cases={`+${numeral(countryInfo.todayCases).format("0,0a")}`}
                        total={`+${numeral(countryInfo.cases).format("0,0a")}`}
                        onClick={() => setInfoType('cases')}

                    />
                    <InfoBox
                        title='Recovered'
                        status={'green'}
                        active={infoType === 'recovered'}
                        cases={`+${numeral(countryInfo.todayRecovered).format("0,0a")}`}
                        total={`+${numeral(countryInfo.recovered).format("0,0a")}`}
                        onClick={() => setInfoType('recovered')}
                    />
                    <InfoBox
                        title='Deaths'
                        status={'grey'}
                        active={infoType === 'deaths'}
                        cases={`+${numeral(countryInfo.todayDeaths).format("0,0a")}`}
                        total={`+${numeral(countryInfo.deaths).format("0,0a")}`}
                        onClick={() => setInfoType('deaths')}
                    />
                </div>
                <Map data={data}
                    center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
                    zoom={mapCenter.zoom}
                    type={infoType}
                />
            </div>
            <Card className="app__side">
                <CardContent className="card__container">
                    <div className="card__countriesInfo">
                        <h3>Live Cases by Country</h3>
                        <Table countries={table} />
                    </div>
                    <div className="card__countriesChart">
                        <h3>Worldwide new Cases</h3>
                        <Graph casesType={infoType} />
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default App
