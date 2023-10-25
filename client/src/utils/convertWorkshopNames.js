export const convertWorkshopNames = workshopArr => {
  const namesArr = [];

  for (let i = 0; i < workshopArr.length; i++) {
    namesArr.push(workshopArr[i].name)
  }
  return namesArr.join(', ')
};
