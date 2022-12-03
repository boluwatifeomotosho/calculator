// Let's start coding
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
// const equal = document.querySelector('.key--equal');
const calcDisplay = document.querySelector('.calculator__display');

const clear = function (htmlClass, defNum = 0) {
  htmlClass.innerHTML = `${defNum}`;
};

const calculate = function (num1, operator, num2) {
  let result = '';

  if (operator === 'add') result = parseFloat(num1) + parseFloat(num2);
  if (operator === 'subtract') result = parseFloat(num1) + parseFloat(num2);
  if (operator === 'multiply') result = parseFloat(num1) * parseFloat(num2);
  if (operator === 'divide') result = parseFloat(num1) / parseFloat(num2);

  return (calcDisplay.textContent = result);
};

keys.addEventListener('click', function (e) {
  const key = e.target.closest('button');
  const action = key.dataset.action;
  const keyContent = e.target.textContent;
  let pressedKey = calculator.dataset.pressedKey;

  const operator =
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide';

  // Remove is-depressed class
  Array.from(key.parentNode.children).forEach(child =>
    child.classList.remove('is-depressed')
  );

  // Number keys
  if (!action) {
    if (calcDisplay.textContent === '0' || pressedKey === 'operator') {
      calcDisplay.textContent = keyContent;
    } else {
      calcDisplay.textContent = calcDisplay.textContent.concat(keyContent);
    }
    calculator.dataset.pressedKey = 'number';
  }

  // Operator keys
  if (operator) {
    calculator.dataset.pressedKey = 'operator';
    // Add is-depressed class
    key.classList.add('is-depressed');

    // Save first value
    calculator.dataset.initValue = calcDisplay.textContent;
    calculator.dataset.operator = action;

    // Add custom attribute
  }

  if (action === 'decimal') {
    calculator.dataset.pressedKey = 'decimal';
    if (!calcDisplay.textContent.includes('.')) {
      calcDisplay.textContent += keyContent;
    }
  }

  if (action === 'clear') {
    calculator.dataset.pressedKey = 'clear';
    clear(calcDisplay);
  }

  if (action === 'calculate') {
    calculator.dataset.previousKeyType = 'calculate';
    const initValue = calculator.dataset.initValue;
    const operator = calculator.dataset.operator;
    const secondValue = calcDisplay.textContent;

    calculate(initValue, operator, secondValue);
  }
});
