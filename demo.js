class Calculator {
    constructor(previousOperandTextArea, currentOperandTextArea) {
        this.previousOperandTextArea = previousOperandTextArea;
        this.currentOperandTextArea = currentOperandTextArea;
        this.clearData();
    }

    clearData() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    deleteData() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendOperand(number) {
        console.log(parseFloat(number));
        if (number === "." && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();



    }

    chooseOperator(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operator = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }


    formatDisplay(number) {
        const stringNumber = number.toString();
        const integerDigits = stringNumber.split('.')[0];
        const decimalDigits = stringNumber.split('.')[1];
        console.log(integerDigits, decimalDigits);
        let numberDisplay;
        if (isNaN(integerDigits)) {
            numberDisplay = '';
            console.log(numberDisplay);
        } else {
            numberDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            })
        }
        if (decimalDigits != null) {
            return `${ integerDigits }.${ decimalDigits }`;
        } else {
            console.log(numberDisplay);
            return numberDisplay;

        }



    }

    compute() {
        let computation;
        let prevOperand = parseFloat(this.previousOperand);
        let currOperand = parseFloat(this.currentOperand);

        if (isNaN(prevOperand) || isNaN(currOperand))
            return;
        console.log(this.operator);

        switch (this.operator) {
            case "×":
                computation = prevOperand * currOperand;

                break;

            case "÷":

                computation = prevOperand / currOperand;
                break;

            case "+":
                computation = prevOperand + currOperand;

                break;

            case "-":
                computation = prevOperand - currOperand;
                break;

            default:
                return;
        }

        this.currentOperand = computation;
        console.log(computation);
        this.previousOperand = '';
        this.operator = undefined;

    }




    updateDisplay() {
        this.currentOperandTextArea.innerText = this.formatDisplay(this.currentOperand);
        if (this.operator != null) {
            this.previousOperandTextArea.innerText = `${ this.formatDisplay(this.previousOperand) } ${ this.operator }`;
        } else {
            this.previousOperandTextArea.innerText = '';
        }

    }

}





const numbersButtons = document.querySelectorAll('[data-operands]');
const operationButtons = document.querySelectorAll('[data-operations]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const dataCalc = document.querySelector('[data-calc]');
let previousOperandTextArea = document.querySelector('[data-previous-operand]');
let currentOperandTextArea = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextArea, currentOperandTextArea);

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendOperand(button.innerText);
        calculator.updateDisplay();
    })
});

allClearButton.addEventListener('click', () => {
    calculator.clearData();
    calculator.updateDisplay();
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();

    })
});

dataCalc.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.deleteData();
    calculator.updateDisplay();
})