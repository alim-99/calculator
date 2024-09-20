const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove('is-depressed'),
    )

    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }
    

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = '0.'
      }
      
    calculator.dataset.previousKeyType = 'decimal'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum
      
    // Note: It's sufficient to check for firstValue and operator because secondValue always exists
      if (firstValue && operator && previousKeyType !== 'operator') {
        display.textContent = calculate(firstValue, operator, secondValue)
      }
      
    key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstValue = displayedNum
      calculator.dataset.operator = action
    }

      if (action === 'clear') {
        display.textContent = 0;
        key.textContent = 'AC';
        calculator.dataset.previousKeyType = 'clear';
      } else if (action !== 'clear') {
          const clearButton = calculator.querySelector('[data-action=clear]');
          clearButton.textContent = 'CE';
      }
    
      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
        
      if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayedNum
          }
          
      display.textContent = calculate(firstValue, operator, secondValue)
        }
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
      }
  };
});

const calculate = (n1, operator, n2) => {
  if (operator === 'add') return parseFloat(n1) + parseFloat(n2)
  if (operator === 'subtract') return parseFloat(n1) - parseFloat(n2)
  if (operator === 'multiply') return parseFloat(n1) * parseFloat(n2)
  if (operator === 'divide') return parseFloat(n1) / parseFloat(n2)
}