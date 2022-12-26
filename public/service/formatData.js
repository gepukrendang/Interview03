import { average, max, min, median } from "../math/math.js";

function DataSingly(date, average, min, max, median) {
  this.date = date;
  this.average = average;
  this.min = min;
  this.max = max;
  this.median = median;
}

export function formatData(sensorData) {
  const formatDate = (array) => {
    array.forEach(function (item) {
      let date = new Date(item.timestamp);
      let dateString = date.toLocaleDateString("en-US");
      item.timestamp = dateString;
    });
    return array;
  };

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  const sensorFormatDate = formatDate(sensorData.array);
  const sensorDataArea = groupBy(sensorFormatDate, "roomArea");

  const groupByDate = (array) => {
    return array.reduce(function (acc, curr) {
      let date = curr.timestamp;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
  };

  const sensorByDateRoom1 = groupByDate(sensorDataArea.roomArea1);
  const sensorByDateRoom2 = groupByDate(sensorDataArea.roomArea2);
  const sensorByDateRoom3 = groupByDate(sensorDataArea.roomArea3);

  const sensorGetMetrics = (array) => {
    let Temp = [];
    let Humid = [];
    for (const key in array) {
      let temp = [];
      let humid = [];

      for (const element in array[key]) {
        temp.push(array[key][element].temperature);
        humid.push(array[key][element].humidity);
      }

      let avgTemp = average(temp);
      let minTemp = min(temp);
      let maxTemp = max(temp);
      let medTemp = median(temp);

      let avgHumid = average(humid);
      let minHumid = min(humid);
      let maxHumid = max(humid);
      let medHumid = median(humid);

      const dataTemp = new DataSingly(key, avgTemp, minTemp, maxTemp, medTemp);
      const dataHumid = new DataSingly(
        key,
        avgHumid,
        minHumid,
        maxHumid,
        medHumid
      );
      Temp.push(dataTemp);
      Humid.push(dataHumid);
    }

    return { Temp, Humid };
  };

  const sensorDataRoom1 = sensorGetMetrics(sensorByDateRoom1);
  const sensorDataRoom2 = sensorGetMetrics(sensorByDateRoom2);
  const sensorDataRoom3 = sensorGetMetrics(sensorByDateRoom3);

  return [sensorDataRoom1, sensorDataRoom2, sensorDataRoom3];
}
