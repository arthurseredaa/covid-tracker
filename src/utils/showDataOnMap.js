import React from "react";

import { Circle, Popup } from "react-leaflet";
import { prettyStatsFormat, prettyPopupFormat } from "./prettyStatsFromat";

export const casesTypeColors = {
  cases: {
    hex: "#318CE7",
    rgba: "rgba(49,140,231, .7)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgba: "rgba(125, 215, 29, .7)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgba: "rgba(251, 68, 67, .7)",
    multiplier: 2000,
  },
};
// Draw circles on map
export const showDataOnMap = (data, casesType = "cases") => {
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="popup-container">
          <div>
            <img className="popup-flag" src={country.countryInfo.flag} />
          </div>
          <div className="popup-name">{country.country}</div>
          <div className="popup-cases">
            Confirmed cases: <span>{prettyPopupFormat(country.cases)}</span>
          </div>
          <div className="popup-recovered">
            Recovered: <span>{prettyPopupFormat(country.recovered)}</span>
          </div>
          <div className="popup-deaths">
            Deaths: <span>{prettyPopupFormat(country.deaths)}</span>
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
