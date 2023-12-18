const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numbercheck = document.querySelector("#Number");
const symbolCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '`~!@#$%^&*()_-+{}[]<>?/'

let password = "";
let passwordLength = 10;

let checkCount = 1;
handalSlider()
//set strength cricle color to gray

//Set Password Length 
function handalSlider() {

    let a = inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;
    //or kuch bhi karna chahiye

}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow Hw
}

function getRndInterger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInterger(0, 9);
}

function generateUpperCase() {
    return String.fromCharCode(getRndInterger(65, 91));
}

function generateLowerCase() {
    return String.fromCharCode(getRndInterger(97, 123));
}

function generateSymbol() {
    // let randNum = Math.floor(Math.random() * symbols.length);

    let randNum = getRndInterger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (uppercaseCheck.checked) hasLower = true;
    if (uppercaseCheck.checked) hasNum = true;
    if (uppercaseCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0")
    }
    else {
        setIndicator("#f00")
    }

}

generateSymbol()