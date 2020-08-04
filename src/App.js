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
  // center of Pacific Ocean
  // const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState("recovered");

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
        setMapCountries(data);
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
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
        />

        <div className="app__stats">
          <InfoBox
            title="Coronavirus cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
            customClass="info-cases"
            caseType={"cases"}
            setCaseType={setCaseType}
            active={caseType === "cases"}
          />
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
            customClass="info-recovered"
            caseType={"recovered"}
            setCaseType={setCaseType}
            active={caseType === "recovered"}
          />
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
            customClass="info-deaths"
            caseType={"deaths"}
            setCaseType={setCaseType}
            active={caseType === "deaths"}
          />
        </div>

        <Map
          countries={mapCountries}
          caseType={caseType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Sidebar
        tableData={tableData}
        setLoading={setLoading}
        setCaseType={setCaseType}
        caseType={caseType}
      />
    </div>
  );
};
