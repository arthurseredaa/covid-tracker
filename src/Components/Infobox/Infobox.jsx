import React, { useState } from "react";
import "./Infobox.css";

import { Card, CardContent, Typography } from "@material-ui/core";
import { casesTypeColors } from "./../../utils/showDataOnMap";
import { prettyStatsFormat } from "./../../utils/prettyStatsFromat";
// import { numeral } from "numeral";
let numeral = require("numeral");
export const InfoBox = ({
  title,
  cases = 0,
  total = 0,
  customClass,
  caseType,
  setCaseType,
  active,
}) => {
  debugger;
  const onChangeCase = () => {
    setCaseType(caseType);
    console.log(caseType);
  };

  let styles = {
      borderBottom: active
        ? "0px"
        : `5px solid ${casesTypeColors[caseType].hex}`,
    },
    stylesH2 = {
      color: `${casesTypeColors[caseType].hex}`,
    };

  return (
    <Card
      className={`infobox ${customClass}`}
      data-value={caseType}
      onClick={() => {
        onChangeCase();
      }}
      style={styles}
    >
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 style={stylesH2} className="infobox__cases">
          {prettyStatsFormat(cases)}
        </h2>
        <Typography className="infobox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};
