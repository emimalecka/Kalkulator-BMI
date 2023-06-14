// BMI Calculator

// Variables for storing user inputs and previous measurements
let weight, height, BMI, measurements = [];

// Function to calculate BMI based on user inputs
function calculateBMI() {
  weight = Number(document.getElementById("weight").value);
  height = Number(document.getElementById("height").value);
  if (weight >= 40 && weight <= 200 && height >= 120 && height <= 240) {
    BMI = weight / (height * height) * 10000;
    displayResult(BMI);
    updateHistory(weight, height, BMI);
  } else {
    if (weight < 40 || weight > 200) {
      displayError(" Waga nie jest poprawna ");
    }
    if (height < 120 || height > 240) {
      displayError(" Wzrost nie jest poprawny ");
    }
    if ((weight < 40 || weight > 200) && (height < 120 || height > 240)) {
      displayError(" Waga i wzrost nie są poprawne ");
    }
  }
}

// Function to display result
function displayResult(BMI) {
  document.getElementById("result-height").innerHTML = " Wpisany wzrost: " + height + " cm ";
  document.getElementById("result-weight").innerHTML = " Wpisana waga: " + weight + " kg ";
  document.getElementById("result-BMI").innerHTML = " Twoje BMI wynosi: " + BMI.toFixed(2);
  if (measurements.length > 0) {
    let lastBMI = measurements[measurements.length - 1].BMI;
    if (BMI > lastBMI) {
      document.getElementById("result-message").innerHTML = " Twoje BMI wzrosło! ";
    } else if (BMI < lastBMI) {
      document.getElementById("result-message").innerHTML = " Twoje BMI spadło! ";
    }
  }
  clearInputs();
  document.getElementById("result-error").innerHTML = "";
}

// Function to display error message
function displayError(message) {
  document.getElementById("result-error").innerHTML = message;
}

// Function to update measurement history
function updateHistory(weight, height, BMI) {
  let measurement = {
    weight: weight,
    height: height,
    BMI: BMI,
    date: new Date()
  }
  measurements.push(measurement);
  displayMeasurement();
  displayAverageBMI();
  saveData();
}

// Function to display measurement history
function displayMeasurement() {
  let list = document.getElementById("measurements-list");
  list.innerHTML = "";
  for (let i = 0; i < measurements.length; i++) {
    let measurement = measurements[i];
    let date = measurement.date;
    let item = document.createElement("li");
    let link = document.createElement("a");
    link.innerHTML = " Pomiar z " + date.toLocaleString();
    link.addEventListener("click", function () {
      displayMeasurementDetails(i);
    });
    item.appendChild(link);
    list.appendChild(item);
  }
}

// Function to display details of a specific measurement
function displayMeasurementDetails(index) {
  let measurement = measurements[index];
  document.getElementById("result-height").innerHTML = " Wzrost: " + measurement.height + " cm ";
  document.getElementById("result-weight").innerHTML = " Waga: " + measurement.weight + " kg ";
  document.getElementById("result-BMI").innerHTML = " BMI: " + measurement.BMI.toFixed(2);
  document.getElementById("result-message").innerHTML = "";
  document.getElementById("result-error").innerHTML = "";
}

// Function to calculate average BMI from history
function displayAverageBMI() {
  let sum = 0;
  for (let i = 0; i < measurements.length; i++) {
    sum += measurements[i].BMI;
  }
  let averageBMI = sum / measurements.length;
  document.getElementById("history-average").innerHTML = averageBMI.toFixed(2);
}

// Function to clear input fields
function clearInputs() {
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
}

// Function to clear measurement history
function clearHistory() {
  measurements = [];
  displayMeasurement();
  displayAverageBMI();
  document.getElementById("result-height").innerHTML = "";
  document.getElementById("result-weight").innerHTML = "";
  document.getElementById("result-BMI").innerHTML = "";
  document.getElementById("measurements-list").innerHTML = "";
  document.getElementById("history-average").innerHTML = "";
  document.getElementById("result-message").innerHTML = "";
  document.getElementById("result-error").innerHTML = "";
  localStorage.removeItem("measurments");
}

let clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearHistory);

// Save history when the page is reloaded

// Function to save data to local storage
function saveData() {
  localStorage.setItem("measurements", JSON.stringify(measurements));
}

// Function to retrieve data from local storage
function retrieveData() {
  let storedData = localStorage.getItem("measurements");
  if (storedData) {
    measurements = JSON.parse(storedData);
    displayMeasurement();
    displayAverageBMI();
  }
}
window.onload = function () {
  retrieveData();
};

