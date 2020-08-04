import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./Header.css";
import { nanoid } from "nanoid";
export const Header = ({
  countriesList,
  selectedCountry,
  setCountry,
  setCountryInfo,
  setLoading,
  setMapCenter,
  setMapZoom,
}) => {
  const onChangeCountry = async (e) => {
    setLoading(true);
    let country = e.target.value;

    const url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(country);
        setCountryInfo(data);
        setLoading(false);
        if (country === "worldwide") {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(3);
        }
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <div className="app__header">
      <h1>Covid-19 tracker</h1>

      <FormControl variant="outlined" className="app__dropdown">
        <Select value={selectedCountry} onChange={(e) => onChangeCountry(e)}>
          <MenuItem value="worldwide">
            <em>Worldwide</em>
          </MenuItem>
          {countriesList.map((country) => {
            let id = nanoid(5);
            return (
              <MenuItem key={id} value={country.countryInfo.iso}>
                <img
                  src={country.countryInfo.flag}
                  width="20"
                  alt="flag icon"
                />
                {country.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
