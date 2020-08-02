export const sortData = (data) => {
  let copyData = [...data];

  return copyData.sort((a, b) =>
    a.cases > b.cases ? -1 : a.cases < b.cases ? 1 : 0
  );
};
