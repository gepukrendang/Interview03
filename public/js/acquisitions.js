import { dataGenerate } from "../service/sensorData.js";
import { average, max, min, median } from "../math/math.js";
import sensorData from "../data/sensor_data.json" assert { type: "json" };
import {
  humidRoom1,
  tempRoom1,
  humidRoom2,
  tempRoom2,
  humidRoom3,
  tempRoom3,
  scalesHumidity,
  scalesTemperature,
} from "./chartConfig.js";
import { formatData } from "../service/formatData.js";

let stopBtn = document.getElementById("stopBtn");
let saveBtn = document.getElementById("saveBtn");

let stopState = false;
let sensorDatabase = sensorData;

const ctxDataHumidity1 = document.getElementById("chartHumidity1");
const ctxDataTemperature1 = document.getElementById("chartTemperature1");
const ctxDataHumidity2 = document.getElementById("chartHumidity2");
const ctxDataTemperature2 = document.getElementById("chartTemperature2");
const ctxDataHumidity3 = document.getElementById("chartHumidity3");
const ctxDataTemperature3 = document.getElementById("chartTemperature3");

let LineTempOne = new Chart(ctxDataTemperature1, {
  type: "line",
  data: tempRoom1,
  options: {
    showLines: true,
    responsive: false,
    scales: scalesTemperature,
  },
});

let LineHumidOne = new Chart(ctxDataHumidity1, {
  type: "line",
  data: humidRoom1,
  options: {
    showLines: true,
    responsive: false,
    scales: scalesHumidity,
  },
});

let LineTempTwo = new Chart(ctxDataTemperature2, {
  type: "line",
  data: tempRoom2,
  options: {
    showLines: true,
    responsive: false,
    scales: scalesTemperature,
  },
});

let LineHumidTwo = new Chart(ctxDataHumidity2, {
  type: "line",
  data: humidRoom2,
  options: {
    showLines: true,
    responsive: false,
    scales: scalesHumidity,
  },
});

let LineTempThree = new Chart(ctxDataTemperature3, {
  type: "line",
  data: tempRoom3,
  options: {
    showLines: true,
    responsive: false,
    scales: scalesTemperature,
  },
});

let LineHumidThree = new Chart(ctxDataHumidity3, {
  type: "line",
  data: humidRoom3,
  options: {
    showLines: true,
    responsive: false,
    scales: scalesHumidity,
  },
});

const seedData = function () {
  for (const key in sensorDataArea[0].Temp) {
    LineTempOne.data.labels.push(sensorDataArea[1].Temp[key].date);
    LineTempOne.data.datasets[0].data.push(sensorDataArea[0].Temp[key].average);
    LineTempOne.data.datasets[1].data.push(sensorDataArea[0].Temp[key].min);
    LineTempOne.data.datasets[2].data.push(sensorDataArea[0].Temp[key].max);
    LineTempOne.data.datasets[3].data.push(sensorDataArea[0].Temp[key].median);
  }
  LineTempOne.update();

  for (const key in sensorDataArea[0].Humid) {
    LineHumidOne.data.labels.push(sensorDataArea[0].Humid[key].date);
    LineHumidOne.data.datasets[0].data.push(
      sensorDataArea[0].Humid[key].average
    );
    LineHumidOne.data.datasets[1].data.push(sensorDataArea[0].Humid[key].min);
    LineHumidOne.data.datasets[2].data.push(sensorDataArea[0].Humid[key].max);
    LineHumidOne.data.datasets[3].data.push(
      sensorDataArea[0].Humid[key].median
    );
  }
  LineHumidOne.update();

  for (const key in sensorDataArea[1].Temp) {
    LineTempTwo.data.labels.push(sensorDataArea[1].Temp[key].date);
    LineTempTwo.data.datasets[0].data.push(sensorDataArea[1].Temp[key].average);
    LineTempTwo.data.datasets[1].data.push(sensorDataArea[1].Temp[key].min);
    LineTempTwo.data.datasets[2].data.push(sensorDataArea[1].Temp[key].max);
    LineTempTwo.data.datasets[3].data.push(sensorDataArea[1].Temp[key].median);
  }
  LineTempTwo.update();

  for (const key in sensorDataArea[1].Humid) {
    LineHumidTwo.data.labels.push(sensorDataArea[1].Humid[key].date);
    LineHumidTwo.data.datasets[0].data.push(
      sensorDataArea[1].Humid[key].average
    );
    LineHumidTwo.data.datasets[1].data.push(sensorDataArea[1].Humid[key].min);
    LineHumidTwo.data.datasets[2].data.push(sensorDataArea[1].Humid[key].max);
    LineHumidTwo.data.datasets[3].data.push(
      sensorDataArea[1].Humid[key].median
    );
  }

  LineHumidTwo.update();

  for (const key in sensorDataArea[2].Temp) {
    LineTempThree.data.labels.push(sensorDataArea[2].Temp[key].date);
    LineTempThree.data.datasets[0].data.push(
      sensorDataArea[2].Temp[key].average
    );
    LineTempThree.data.datasets[1].data.push(sensorDataArea[2].Temp[key].min);
    LineTempThree.data.datasets[2].data.push(sensorDataArea[2].Temp[key].max);
    LineTempThree.data.datasets[3].data.push(
      sensorDataArea[2].Temp[key].median
    );
  }
  LineTempThree.update();

  for (const key in sensorDataArea[1].Temp) {
    LineHumidThree.data.labels.push(sensorDataArea[2].Humid[key].date);
    LineHumidThree.data.datasets[0].data.push(
      sensorDataArea[2].Humid[key].average
    );
    LineHumidThree.data.datasets[1].data.push(sensorDataArea[2].Humid[key].min);
    LineHumidThree.data.datasets[2].data.push(sensorDataArea[2].Humid[key].max);
    LineHumidThree.data.datasets[3].data.push(
      sensorDataArea[2].Humid[key].median
    );
  }
  LineHumidThree.update();
};

const sensorDataArea = formatData(sensorDatabase);

const updateData = function () {
  let currData = dataGenerate();
  sensorDatabase.array.push(currData[0]);
  sensorDatabase.array.push(currData[1]);
  sensorDatabase.array.push(currData[2]);

  const sensorDataArea = formatData(sensorDatabase);

  LineTempOne.data.labels = [];
  LineTempOne.data.datasets[0].data = [];
  LineTempOne.data.datasets[1].data = [];
  LineTempOne.data.datasets[2].data = [];
  LineTempOne.data.datasets[3].data = [];

  for (const key in sensorDataArea[0].Temp) {
    LineTempOne.data.labels.push(sensorDataArea[0].Temp[key].date);
    LineTempOne.data.datasets[0].data.push(sensorDataArea[0].Temp[key].average);
    LineTempOne.data.datasets[1].data.push(sensorDataArea[0].Temp[key].min);
    LineTempOne.data.datasets[2].data.push(sensorDataArea[0].Temp[key].max);
    LineTempOne.data.datasets[3].data.push(sensorDataArea[0].Temp[key].median);
  }

  document.getElementById("averageTemp1").innerHTML = Math.round(
    sensorDataArea[0].Temp.slice(-1)[0].average
  );
  document.getElementById("maxTemp1").innerHTML =
    sensorDataArea[0].Temp.slice(-1)[0].min;
  document.getElementById("minTemp1").innerHTML =
    sensorDataArea[0].Temp.slice(-1)[0].max;
  document.getElementById("medianTemp1").innerHTML =
    sensorDataArea[0].Temp.slice(-1)[0].median;

  LineTempOne.update();

  LineHumidOne.data.labels = [];
  LineHumidOne.data.datasets[0].data = [];
  LineHumidOne.data.datasets[1].data = [];
  LineHumidOne.data.datasets[2].data = [];
  LineHumidOne.data.datasets[3].data = [];

  for (const key in sensorDataArea[0].Humid) {
    LineHumidOne.data.labels.push(sensorDataArea[0].Humid[key].date);
    LineHumidOne.data.datasets[0].data.push(
      sensorDataArea[0].Humid[key].average
    );
    LineHumidOne.data.datasets[1].data.push(sensorDataArea[0].Humid[key].min);
    LineHumidOne.data.datasets[2].data.push(sensorDataArea[0].Humid[key].max);
    LineHumidOne.data.datasets[3].data.push(
      sensorDataArea[0].Humid[key].median
    );
  }

  document.getElementById("averageHumid1").innerHTML = Math.round(
    sensorDataArea[0].Humid.slice(-1)[0].average
  );
  document.getElementById("minHumid1").innerHTML =
    sensorDataArea[0].Humid.slice(-1)[0].min;
  document.getElementById("maxHumid1").innerHTML =
    sensorDataArea[0].Humid.slice(-1)[0].max;
  document.getElementById("medianHumid1").innerHTML =
    sensorDataArea[0].Humid.slice(-1)[0].median;

  LineHumidOne.update();

  LineTempTwo.data.labels = [];
  LineTempTwo.data.datasets[0].data = [];
  LineTempTwo.data.datasets[1].data = [];
  LineTempTwo.data.datasets[2].data = [];
  LineTempTwo.data.datasets[3].data = [];

  for (const key in sensorDataArea[1].Temp) {
    LineTempTwo.data.labels.push(sensorDataArea[1].Temp[key].date);
    LineTempTwo.data.datasets[0].data.push(sensorDataArea[1].Temp[key].average);
    LineTempTwo.data.datasets[1].data.push(sensorDataArea[1].Temp[key].min);
    LineTempTwo.data.datasets[2].data.push(sensorDataArea[1].Temp[key].max);
    LineTempTwo.data.datasets[3].data.push(sensorDataArea[1].Temp[key].median);
  }

  document.getElementById("averageTemp2").innerHTML = Math.round(
    sensorDataArea[2].Temp.slice(-1)[0].average
  );
  document.getElementById("maxTemp2").innerHTML =
    sensorDataArea[2].Temp.slice(-1)[0].min;
  document.getElementById("minTemp2").innerHTML =
    sensorDataArea[2].Temp.slice(-1)[0].max;
  document.getElementById("medianTemp2").innerHTML =
    sensorDataArea[2].Temp.slice(-1)[0].median;

  LineTempTwo.update();

  LineHumidTwo.data.labels = [];
  LineHumidTwo.data.datasets[0].data = [];
  LineHumidTwo.data.datasets[1].data = [];
  LineHumidTwo.data.datasets[2].data = [];
  LineHumidTwo.data.datasets[3].data = [];

  for (const key in sensorDataArea[1].Humid) {
    LineHumidTwo.data.labels.push(sensorDataArea[1].Humid[key].date);
    LineHumidTwo.data.datasets[0].data.push(
      sensorDataArea[1].Humid[key].average
    );
    LineHumidTwo.data.datasets[1].data.push(sensorDataArea[1].Humid[key].min);
    LineHumidTwo.data.datasets[2].data.push(sensorDataArea[1].Humid[key].max);
    LineHumidTwo.data.datasets[3].data.push(
      sensorDataArea[1].Humid[key].median
    );
  }

  document.getElementById("averageHumid2").innerHTML = Math.round(
    sensorDataArea[1].Humid.slice(-1)[0].average
  );
  document.getElementById("maxHumid2").innerHTML =
    sensorDataArea[1].Humid.slice(-1)[0].min;
  document.getElementById("minHumid2").innerHTML =
    sensorDataArea[1].Humid.slice(-1)[0].max;
  document.getElementById("medianHumid2").innerHTML =
    sensorDataArea[1].Humid.slice(-1)[0].median;

  LineHumidTwo.update();

  LineTempThree.data.labels = [];
  LineTempThree.data.datasets[0].data = [];
  LineTempThree.data.datasets[1].data = [];
  LineTempThree.data.datasets[2].data = [];
  LineTempThree.data.datasets[3].data = [];

  for (const key in sensorDataArea[2].Temp) {
    LineTempThree.data.labels.push(sensorDataArea[1].Temp[key].date);
    LineTempThree.data.datasets[0].data.push(
      sensorDataArea[2].Temp[key].average
    );
    LineTempThree.data.datasets[1].data.push(sensorDataArea[2].Temp[key].min);
    LineTempThree.data.datasets[2].data.push(sensorDataArea[2].Temp[key].max);
    LineTempThree.data.datasets[3].data.push(
      sensorDataArea[2].Temp[key].median
    );
  }

  document.getElementById("averageTemp3").innerHTML = Math.round(
    sensorDataArea[2].Temp.slice(-1)[0].average
  );
  document.getElementById("maxTemp3").innerHTML =
    sensorDataArea[2].Temp.slice(-1)[0].min;
  document.getElementById("minTemp3").innerHTML =
    sensorDataArea[2].Temp.slice(-1)[0].max;
  document.getElementById("medianTemp3").innerHTML =
    sensorDataArea[2].Temp.slice(-1)[0].median;

  LineTempThree.update();

  LineHumidThree.data.labels = [];
  LineHumidThree.data.datasets[0].data = [];
  LineHumidThree.data.datasets[1].data = [];
  LineHumidThree.data.datasets[2].data = [];
  LineHumidThree.data.datasets[3].data = [];

  for (const key in sensorDataArea[2].Humid) {
    LineHumidThree.data.labels.push(sensorDataArea[1].Humid[key].date);
    LineHumidThree.data.datasets[0].data.push(
      sensorDataArea[2].Humid[key].average
    );
    LineHumidThree.data.datasets[1].data.push(sensorDataArea[2].Humid[key].min);
    LineHumidThree.data.datasets[2].data.push(sensorDataArea[2].Humid[key].max);
    LineHumidThree.data.datasets[3].data.push(
      sensorDataArea[2].Humid[key].median
    );
  }

  document.getElementById("averageHumid3").innerHTML = Math.round(
    sensorDataArea[2].Humid.slice(-1)[0].average
  );
  document.getElementById("maxHumid3").innerHTML =
    sensorDataArea[2].Humid.slice(-1)[0].min;
  document.getElementById("minHumid3").innerHTML =
    sensorDataArea[2].Humid.slice(-1)[0].max;
  document.getElementById("medianHumid3").innerHTML =
    sensorDataArea[2].Humid.slice(-1)[0].median;

  LineHumidThree.update();

  return sensorDatabase;
};

seedData();

let intervalMain = setInterval(function () {
  updateData();
}, 2000);

function start() {
  intervalMain = setInterval(function () {
    updateData();
  }, 2000);
}

stopBtn.addEventListener("click", function onClick() {
  stopState = !stopState;
  if (stopState) {
    stopBtn.innerHTML = "Start";
    stopBtn.style.backgroundColor = "lightgreen";
    clearInterval(intervalMain);
  }

  if (!stopState) {
    stopBtn.innerHTML = "Stop";
    stopBtn.style.backgroundColor = "salmon";
    start();
  }
});

saveBtn.addEventListener("click", function onClick() {
  let sensorUpdateData = updateData();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(sensorUpdateData, null, 2)], {
      type: "text/plain",
    })
  );
  a.setAttribute("download", "sensorData.txt");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
