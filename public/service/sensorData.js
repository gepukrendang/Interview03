let id = 0;

export function dataGenerate() {
  let timeStamp = Date.now();

  let dataOne = {
    temperature: Math.floor(Math.random() * 30) + 20,
    humidity: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
    roomArea: "roomArea1",
    id: id + 1,
    timestamp: timeStamp,
  };

  let dataTwo = {
    temperature: Math.floor(Math.random() * 30) + 20,
    humidity: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
    roomArea: "roomArea2",
    id: id + 2,
    timestamp: timeStamp,
  };

  let dataThree = {
    temperature: Math.floor(Math.random() * 30) + 20,
    humidity: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
    roomArea: "roomArea3",
    id: id + 3,
    timestamp: timeStamp,
  };

  id = id + 3;
  return [dataOne, dataTwo, dataThree];
}
