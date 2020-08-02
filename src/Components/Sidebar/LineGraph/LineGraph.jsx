import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./LineGraph.css";
const options = {
  legend: {
    display: true,
  },
  responsive: true,
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

export const LineGraph = ({ casesType, chartDay, setLoading }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(
        `https://disease.sh/v3/covid-19/historical/all?lastdays=${chartDay}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          setLoading(false);
        });
    };

    fetchData();
  }, [chartDay, casesType, setLoading]);

  let backgroundColor =
    casesType === "cases"
      ? "rgba(39,93,242, .7)"
      : casesType === "recovered"
      ? "rgba(0,198,82, .7)"
      : "rgba(213,0,0, .7)";

  return (
    <div className="linegraph-wrapper" style={{ margin: "10px" }}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: casesType,
                backgroundColor: backgroundColor,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};
