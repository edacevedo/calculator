window.onload = () => {
    document.addEventListener('click', (event) => console.log(event.target.dataset.keyValue));
}

const OPERATIONS = {
    '+': (numA, numB) => numA + numB,
    '-': (numA, numB) => numA - numB,
    '*': (numA, numB) => numA * numB,
    '/': (numA, numB) => numA / numB
}

let operate = (numA, numB, operator) => OPERATIONS[operator](numA, numB);