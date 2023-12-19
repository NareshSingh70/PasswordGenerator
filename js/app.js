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
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '`~!@#$%^&*()_-+{}[]<>?/'

let password = "";
let passwordLength = 10;

let checkCount = 0;
handalSlider()
//set strength cricle color to gray

//Set Password Length 
function handalSlider() {

    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
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

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch (err) {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000)
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handalCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked) checkCount++;
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handalSlider();
    }
}

allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', handalCheckBoxChange)
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handalSlider();
})

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value) copyContent();
})

generateBtn.addEventListener('click', () => {
    if (checkCount == 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handalSlider();
    }

    // Find New Password
    // remove Old password
    password = "";

    let funArr = []

    if (uppercaseCheck.checked) funArr.push(generateUpperCase);
    if (lowercasecheck.checked) funArr.push(generateLowerCase);

    if (numbercheck.checked) funArr.push(generateRandomNumber);
    if (symbolCheck.checked) funArr.push(generateSymbol);

    // Compulsory additions
    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }

    // remaining addition
    for (let i = 0; i < passwordLength - funArr.length; i++) {
        let randIndex = getRndInterger(0, funArr.length);
        password += funArr[randIndex]();
    }

    // shuffle the password
    password = shufflePassword(Array.from(password));

    // show in the UI
    passwordDisplay.value = password;

    console.log(passwordDisplay.value = password);

    // calculate strength
    calcStrength();
})
