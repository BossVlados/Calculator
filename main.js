let result = document.getElementById('display');
let currentOperator = '';
let firstOperand = '';
let secondOperand = '';
const operators = ['+', '-', '*', '/', '%'];
const defaultFontSize = '72px'; // Исходный размер шрифта

function appendToResult(value) {
  if (value === '.' && result.value.includes('.')) {
    return;
  }

  if (currentOperator === '') {
    firstOperand += value;
  } else {
    secondOperand += value;
  }

  result.value += value;
  updateResultDisplay(result.value); // Обновляем размер шрифта при добавлении
}

function allClear() {
  result.value = '';
  firstOperand = '';
  secondOperand = '';
  currentOperator = '';

  // Возвращаем размер шрифта к исходному значению
  result.style.fontSize = defaultFontSize;
}

function removeLast() {
  if (result.value.length > 0) {
    let removedChar = result.value.slice(-1);
    if (currentOperator === '') {
      firstOperand = firstOperand.slice(0, -1);
    } else {
      secondOperand = secondOperand.slice(0, -1);
    }
    result.value = result.value.slice(0, -1);
    updateResultDisplay(result.value);
  }
}

function updateResultDisplay(value) {
  result.value = value;

  if (value.length > 8) {
    result.style.fontSize = '1.5em';
  } else {
    result.style.fontSize = defaultFontSize;
  }
}

function calculate() {
  if (firstOperand !== '' && secondOperand !== '' && currentOperator !== '') {
    let resultValue;
    switch (currentOperator) {
      case '+':
        resultValue = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case '-':
        resultValue = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case '*':
        resultValue = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case '/':
        if (parseFloat(secondOperand) === 0) {
          resultValue = 'Ошибка';
          firstOperand = '';
          secondOperand = '';
          currentOperator = '';
        } else {
          resultValue = parseFloat(firstOperand) / parseFloat(secondOperand);
        }
        break;
      default:
        resultValue = '';
    }
    if (typeof resultValue === 'number') {
      resultValue = resultValue.toFixed(16);
    }

    updateResultDisplay(resultValue);
    firstOperand = resultValue.toString();
    secondOperand = '';
    currentOperator = '';
  }
}

function calculatePercentage() {
  if (firstOperand !== '' && currentOperator === '') {
    result.value = parseFloat(firstOperand) / 100;
    firstOperand = result.value.toString();
    updateResultDisplay(result.value); // Обновляем размер шрифта
  } else if (secondOperand !== '') {
    result.value = parseFloat(secondOperand) / 100;
    secondOperand = result.value.toString();
    updateResultDisplay(result.value); // Обновляем размер шрифта
  }
}

function setOperator(operator) {
  if (firstOperand !== '' && secondOperand !== '' && currentOperator !== '') {
    calculate();
  }

  currentOperator = operator;

  if (
    result.value.endsWith('+') ||
    result.value.endsWith('-') ||
    result.value.endsWith('*') ||
    result.value.endsWith('/') ||
    result.value.endsWith('%')
  ) {
    result.value = result.value.slice(0, -1);
  }

  result.value += operator;
}

document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (
    !isNaN(key) ||
    key === '.' ||
    key === '+' ||
    key === '-' ||
    key === '*' ||
    key === '/' ||
    key === '%'
  ) {
    appendToResult(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    removeLast();
  }
});
