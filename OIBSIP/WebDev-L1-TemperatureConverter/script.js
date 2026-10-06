const ABSOLUTE_ZERO = {
  celsius: -273.15,
  fahrenheit: -459.67,
  kelvin: 0,
};

const UNIT_LABELS = {
  celsius: "°C",
  fahrenheit: "°F",
  kelvin: "K",
};

const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const resultText = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");
const clearButton = document.getElementById("clearButton");
const converterForm = document.getElementById("converterForm");

function formatValue(value) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2).replace(/\.00$/, "");
}

function getOtherUnits(value, unit) {
  switch (unit) {
    case "celsius":
      return {
        fahrenheit: (value * 9) / 5 + 32,
        kelvin: value + 273.15,
      };
    case "fahrenheit":
      return {
        celsius: ((value - 32) * 5) / 9,
        kelvin: ((value - 32) * 5) / 9 + 273.15,
      };
    case "kelvin":
      return {
        celsius: value - 273.15,
        fahrenheit: (value - 273.15) * (9 / 5) + 32,
      };
    default:
      return { celsius: value, fahrenheit: value, kelvin: value };
  }
}

function validateTemperature(value, unit) {
  if (value === "" || value === null || Number.isNaN(Number(value))) {
    return {
      valid: false,
      message: "Please enter a valid numeric temperature.",
    };
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return {
      valid: false,
      message: "Please enter a valid numeric temperature.",
    };
  }

  if (numericValue < ABSOLUTE_ZERO[unit]) {
    return {
      valid: false,
      message: `Temperature cannot be below ${ABSOLUTE_ZERO[unit]} ${UNIT_LABELS[unit]}.`,
    };
  }

  return { valid: true, message: "" };
}

function updateResultDisplay(value, unit) {
  const converted = getOtherUnits(value, unit);
  const currentUnitLabel = UNIT_LABELS[unit];
  const otherUnits = Object.entries(converted);

  const [firstUnit, firstValue] = otherUnits[0];
  const [secondUnit, secondValue] = otherUnits[1];

  resultText.textContent = `${formatValue(value)}${currentUnitLabel} = ${formatValue(firstValue)}${UNIT_LABELS[firstUnit]} / ${formatValue(secondValue)}${UNIT_LABELS[secondUnit]}`;
}

if (converterForm) {
  converterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const rawValue = temperatureInput.value.trim();
    const unit = unitSelect.value;
    const validation = validateTemperature(rawValue, unit);

    temperatureInput.classList.remove("invalid");
    errorMessage.textContent = "";

    if (!validation.valid) {
      temperatureInput.classList.add("invalid");
      errorMessage.textContent = validation.message;
      resultText.textContent = "Result will appear here.";
      return;
    }

    const numericValue = Number(rawValue);
    updateResultDisplay(numericValue, unit);
  });
}

if (clearButton) {
  clearButton.addEventListener("click", function () {
    temperatureInput.value = "";
    unitSelect.value = "celsius";
    temperatureInput.classList.remove("invalid");
    errorMessage.textContent = "";
    resultText.textContent = "Result will appear here.";
    temperatureInput.focus();
  });
}
