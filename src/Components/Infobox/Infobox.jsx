import React from "react";
import "./Infobox.css";

import { Card, CardContent, Typography } from "@material-ui/core";

export const InfoBox = ({ title, cases, total, customClass }) => {
  return (
    <Card className={`infobox ${customClass}`}>
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infobox__cases">{0 || cases}</h2>
        <Typography className="infobox__total" color="textSecondary">
          {0 || total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};
