let numeral = require("numeral");

export const prettyStatsFormat = (stat) => numeral(stat).format("+0.0a"),
  prettyPopupFormat = (stat) => numeral(stat).format("0,0");
