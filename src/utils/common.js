export const filteredInformation = (originalData, searchby) => {
  const filterData = originalData.filter((data) => {
    return data.id === searchby.id;
  });
  return filterData;
};
