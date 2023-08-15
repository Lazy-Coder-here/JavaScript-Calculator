class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  // this function is going to clear different variables
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  // this function removes a single number
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // this tells what's going to happen when a user clicks on a number
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // this going to happen when an user clicks on any operation
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // this going to compute the ans and give the output result
  calculate() {
    var calculation;
    var prev = parseFloat(this.previousOperand);
    var curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        calculation = prev + curr;
        break;
      case "-":
        calculation = prev - curr;
        break;
      case "*":
        calculation = prev * curr;
        break;
      case "÷":
        calculation = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = calculation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    var stringNumber = number.toString();
    var integerDigits = parseFloat(stringNumber.split(".")[0]);
    var decimalDigits = stringNumber.split(".")[1];
    var integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // this is going to update the values inside our output
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

var numberButtons = document.querySelectorAll(".number");
var operationButtons = document.querySelectorAll(".operation");
var equalsButton = document.querySelector("#equals");
var deleteButton = document.querySelector("#delete");
var allClearButton = document.querySelector("#allClear");
var previousOperandTextElement = document.querySelector(".previous-output");
var currentOperandTextElement = document.querySelector(".current-output");

var calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.calculate();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
