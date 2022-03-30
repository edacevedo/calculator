window.onload = () => {
    document.addEventListener('click', (event) => {
        textDisplay += event.target.dataset.keyValue;
        display.textContent = textDisplay;
    });
}

let display = document.querySelector('#display');

let textDisplay = '';

const OPERATIONS = {
    '+': (numA, numB) => numA + numB,
    '-': (numA, numB) => numA - numB,
    '*': (numA, numB) => numA * numB,
    '/': (numA, numB) => numA / numB
}

let operate = (numA, numB, operator) => OPERATIONS[operator](numA, numB);