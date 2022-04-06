window.onload = () => {
    [...document.querySelectorAll('.key')].map((key)=> {key.addEventListener('click', onClickKey)});
}

let display = document.querySelector('#display span');

let textDisplay = '';

const OPERATIONS = {
    '+': (numA, numB) => numA + numB,
    '-': (numA, numB) => numA - numB,
    '*': (numA, numB) => numA * numB,
    '/': (numA, numB) => numA / numB
}

let operate = (numA, numB, operator) => OPERATIONS[operator](numA, numB);

let setDisplay = (value) => {
    display.textContent = value;
}

let onClickKey = (event) => {
    let keyValue = event.target.dataset.keyValue;

    if (keyValue === '.') {
        textDisplay = allowDot() ? textDisplay + keyValue : textDisplay;
        setDisplay(textDisplay);
        return;
    }
   
    if (Number.parseInt(keyValue) || keyValue === '0') {
        textDisplay += keyValue;
    } else {
        if (Number.parseInt(textDisplay[textDisplay.length -1]) || 
                textDisplay[textDisplay.length -1] === '0'){
            textDisplay += keyValue;
        } else if (textDisplay) {
            textDisplay = textDisplay.slice(0, textDisplay.length - 1) + keyValue;
        }
    }

    textDisplay && setDisplay(textDisplay);
}

let allowDot = () => {
    let displayArray = Array.from(textDisplay),
        allow = true,
        value ;

    for (let index = displayArray.length; index >= 0; index--) {
        value = displayArray[index];
        if ((value === '+' || value === "-" || value === "/" || value === "*") && index <= displayArray.length - 1) {
            break;
        } else if (value === '.') {
          allow = false;
          break;
        } 
        
    }
    return allow;
}

let onClickClear = () => {
    textDisplay = '';
    setDisplay('0');
} 

let onClickUndo = () => {
    textDisplay = Array.from(textDisplay).slice(0, textDisplay.length-1).join('');
    setDisplay(textDisplay);
}

let onClickEqual = () => {
    let operator = '',
       displayArray = Array.from(textDisplay),
       operatorIndex = displayArray.findIndex((key)=>key === '*' || key === '/'),
       leftOperand,
       rigthOperand,
       result;

    while ( operatorIndex != -1) {
        operator =  textDisplay[operatorIndex];
        leftOperand = findLeftOperand(operatorIndex);
        rigthOperand = findRigthOperand(operatorIndex);
        
        if(leftOperand.value && rigthOperand.value) {
            result = Math.round((operate(
                Number.parseFloat(leftOperand.value), 
                Number.parseFloat(rigthOperand.value), 
                operator) + Number.EPSILON) * 100) / 100;
        } else {
            break;
        }
        
        
        displayArray = [...displayArray.slice(0, leftOperand.index), 
            result, 
            ...displayArray.slice(rigthOperand.index, displayArray.length)];

        textDisplay = displayArray.join('');
        displayArray = Array.from(textDisplay);
        operatorIndex = displayArray.findIndex((key)=>key === '*' || key === '/');
    }

    operatorIndex = displayArray.findIndex((key)=>key === '+' || key === '-');

    while ( operatorIndex != -1) {
        operator =  textDisplay[operatorIndex];
        leftOperand = findLeftOperand(operatorIndex);
        rigthOperand = findRigthOperand(operatorIndex);

        if(leftOperand.value && rigthOperand.value) {
            result = Math.round((operate(
                Number.parseFloat(leftOperand.value), 
                Number.parseFloat(rigthOperand.value), 
                operator) + Number.EPSILON) * 100) / 100;
        } else {
            break;
        }

        displayArray = [...displayArray.slice(0, leftOperand.index), 
            result, 
            ...displayArray.slice(rigthOperand.index, displayArray.length)];

        textDisplay = displayArray.join('');
        operatorIndex = displayArray.findIndex((key)=>key === '+' || key === '-');
    }

    setDisplay(textDisplay);
}

let findLeftOperand = (operatorIndex) => {
    let value = '',
        index,
        positionValue;

    for (index = operatorIndex - 1; index >= 0; index--) {
        positionValue = textDisplay[index];
        if (Number.parseInt(positionValue) || positionValue === '0' || positionValue === '.') {
            value = positionValue + value;
        } else {
            break;
        }
    }
    return {value, index: index + 1};
}

let findRigthOperand = (operatorIndex)=> {
    let value = '',
        index,
        positionValue;

    for (index = operatorIndex + 1; index < textDisplay.length; index++) {
        positionValue = textDisplay[index];
        if (Number.parseInt(positionValue) || positionValue === '0' || positionValue === '.') {
            value = value + textDisplay[index];
        } else {
            break; 
        }   
    }
    return {value, index};
}