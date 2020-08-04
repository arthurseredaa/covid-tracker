import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Table } from "./Table/Table";
import { LineGraph } from "./LineGraph/LineGraph";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "./Sidebar.css";

export const Sidebar = ({ tableData, setLoading, setCaseType, caseType }) => {
  const [chartDay, setChartDay] = useState(7);

  const handleSelectChange = (e) => {
    setCaseType(e.target.value);
  };

  const handleButtonGroupChange = (e, day) => {
    setChartDay(day);
  };

  return (
    <div className="app__right">
      <Card className="app__right-card app__right-table">
        <CardContent>
          <h3>Countries live cases</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
      <Card className="app__right-card app__right-graph">
        <h3>
          Worldwide new {caseType}
          {/* <FormControl>
            <Select
              value={caseType}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={handleSelectChange}
            >
              <MenuItem value={"cases"}>cases</MenuItem>
              <MenuItem value={"recovered"}>recovered</MenuItem>
              <MenuItem value={"deaths"}>deaths</MenuItem>
            </Select>
          </FormControl> */}
        </h3>
        <ToggleButtonGroup
          value={chartDay}
          onChange={handleButtonGroupChange}
          exclusive
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton value={7} aria-label="left aligned">
            last 7 days
          </ToggleButton>
          <ToggleButton value={30} aria-label="centered">
            last month
          </ToggleButton>
          <ToggleButton value={90} aria-label="right aligned">
            last 3 month
          </ToggleButton>
        </ToggleButtonGroup>
        <LineGraph
          casesType={caseType}
          chartDay={chartDay}
          setLoading={setLoading}
        />
      </Card>
    </div>
  );
};
