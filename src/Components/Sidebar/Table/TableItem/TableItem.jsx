import React from "react";

export const TableItem = ({ index, name, cases, flagIcon }) => {
  return (
    <tr key={index} className="table__row">
      <td>
        <img src={flagIcon} width="20" alt="flagg icon" />
        {name}
      </td>
      <td>
        <strong>{cases}</strong>
      </td>
    </tr>
  );
};
