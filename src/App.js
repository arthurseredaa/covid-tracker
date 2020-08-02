import React, { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { InfoBox } from "./Components/Infobox/Infobox";
import { Map } from "./Components/Map/Map";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { sortData } from "./utils/sortData";
import { Preloader } from "./Components/Preloader/Preloader";
import "leaflet/dist/leaflet.css";

// https://disease.sh/v3/covid-19/countries
export const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  window.info = countryInfo;

  const getCountriesData = async () => {
    setLoading(true);
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          countryInfo: {
            flag: country.countryInfo.flag,
            iso: country.countryInfo.iso2,
          },
        }));
        setTableData(sortData(data));
        setCountries(countries);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  return (
    <div className="app">
      {loading && <Preloader />}
      <div className="app__left">
        <Header
          countriesList={countries}
          selectedCountry={selectedCountry}
          setCountry={setSelectedCountry}
          setCountryInfo={setCountryInfo}
          setLoading={setLoading}
        />

        <div className="app__stats">
          <InfoBox
            title="Coronavirus cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
            customClass="info-cases"
          />
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
            customClass="info-recovered"
          />
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
            customClass="info-deaths"
          />
        </div>

        <Map />
      </div>
      <Sidebar tableData={tableData} setLoading={setLoading} />
    </div>
  );
};
