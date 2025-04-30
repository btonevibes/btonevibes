document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');

    let currentInput = '0'; // What's currently shown on display or being typed
    let previousInput = null; // First operand
    let operator = null; // The operator (+, -, *, /)
    let shouldResetDisplay = false; // Flag to clear display on next number input

    // Function to update the display
    function updateDisplay() {
        // Basic overflow prevention / formatting (optional)
        let displayValue = currentInput;
        if (displayValue.length > 12) { // Limit display length
            displayValue = parseFloat(displayValue).toExponential(6); // Use scientific notation
        }
         // Handle potential NaN or Infinity results gracefully
        if (displayValue === 'NaN' || displayValue === 'Infinity' || displayValue === '-Infinity') {
            displayValue = 'Error';
            // Optionally reset state here if Error occurs
            // currentInput = '0';
            // previousInput = null;
            // operator = null;
            // shouldResetDisplay = true;
        }
        display.value = displayValue;
    }

    // Function to perform calculation
    function calculate(num1, num2, op) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        if (isNaN(n1) || isNaN(n2)) return 'Error'; // Should not happen with input validation

        switch (op) {
            case 'add':
                return (n1 + n2).toString();
            case 'subtract':
                return (n1 - n2).toString();
            case 'multiply':
                return (n1 * n2).toString();
            case 'divide':
                if (n2 === 0) return 'Error'; // Division by zero
                return (n1 / n2).toString();
            default:
                return num2; // Should not happen
        }
    }

    // Event listener for all button clicks (using event delegation)
    buttons.addEventListener('click', (event) => {
        const target = event.target;
        const action = target.dataset.action;
        const number = target.dataset.number;
        const displayedNum = display.value; // Use display.value as current state sometimes

        if (!target.matches('button')) {
            return; // Ignore clicks not on buttons
        }

        // Handle number clicks
        if (number !== undefined) {
            if (displayedNum === '0' || shouldResetDisplay || displayedNum === 'Error') {
                currentInput = number;
                shouldResetDisplay = false;
            } else {
                 // Prevent excessive length before calculation
                if (currentInput.length < 16) {
                     currentInput += number;
                }
            }
            updateDisplay();
        }

        // Handle decimal click
        if (action === 'decimal') {
            // If display should reset, start with '0.'
            if (shouldResetDisplay || displayedNum === 'Error') {
                currentInput = '0.';
                shouldResetDisplay = false;
            }
            // Add decimal only if not already present
            else if (!currentInput.includes('.')) {
                 // Prevent excessive length
                if (currentInput.length < 16) {
                    currentInput += '.';
                }
            }
            updateDisplay();
        }

        // Handle operator clicks (+, -, *, /)
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
             // Handle consecutive operator presses: use the last one
            if (operator && !shouldResetDisplay) {
                // If an operator is pending and we haven't just calculated, perform the previous operation
                 const result = calculate(previousInput, currentInput, operator);
                 currentInput = result;
                 updateDisplay();
                 previousInput = result; // Store result for chaining
            } else {
                 // Store the first number
                 previousInput = currentInput;
            }

            operator = action;
            shouldResetDisplay = true; // Next number input should clear display
        }

        // Handle equals click
        if (action === 'calculate') {
            if (operator && previousInput !== null) {
                // Check if user pressed equals right after an operator without entering a second number
                const secondOperand = shouldResetDisplay ? previousInput : currentInput;

                currentInput = calculate(previousInput, secondOperand, operator);
                updateDisplay();
                previousInput = null; // Ready for new calculation
                operator = null;
                shouldResetDisplay = true; // Next number starts fresh
            }
             // Allow repeating the last operation if equals is pressed again (common feature)
             // This part is slightly more complex and can be added later if needed.
        }

        // Handle clear click (C)
        if (action === 'clear') {
            currentInput = '0';
            previousInput = null;
            operator = null;
            shouldResetDisplay = false;
            updateDisplay();
        }

        // Handle sign toggle (+/-)
        if (action === 'sign') {
            if (currentInput !== '0' && currentInput !== 'Error') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                // If an operation was pending, update previousInput if it was just set
                if (shouldResetDisplay && previousInput !== null) {
                    previousInput = currentInput;
                }
                updateDisplay();
            }
        }

        // Handle percentage (%)
        if (action === 'percent') {
             if (currentInput !== 'Error') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                 // If an operation was pending, update previousInput if it was just set
                if (shouldResetDisplay && previousInput !== null) {
                    previousInput = currentInput;
                }
                updateDisplay();
             }
        }

        // Optional: Add visual feedback for button press
        target.classList.add('active');
        setTimeout(() => target.classList.remove('active'), 100); // Remove active class after a short delay
    });

    // Initialize display
    updateDisplay();
});

// Add a simple CSS class for active state if needed in style.css
// .button.active {
//     background-color: #ccc; /* Example active style */
// }