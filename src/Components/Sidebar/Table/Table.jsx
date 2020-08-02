import React from "react";
import "./Table.css";
import { TableItem } from "./TableItem/TableItem";
import { Typography } from "@material-ui/core";

export const Table = ({ countries }) => {
  let countriesForTable = countries.map((country, index) => (
    <TableItem
      key={index}
      index={index}
      name={country.country}
      cases={country.cases}
      flagIcon={country.countryInfo.flag}
    />
  ));

  return (
    <div className="sidebar__table">
      <div className="sidebar__header">
        <Typography color="textSecondary">Country</Typography>
        <Typography color="textSecondary">Cases</Typography>
      </div>
      {countriesForTable}
    </div>
  );
};
