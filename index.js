const bill = document.getElementById('bill');
let tipPercentage = document.getElementById('tipPercentage');
let numberOfPeople = document.getElementById('numberOfPeople');
const tipMinus = document.getElementById('tipMinus');
const tipPlus = document.getElementById('tipPlus');
const peopleMinus = document.getElementById('peopleMinus');
const peoplePlus = document.getElementById('peoplePlus');
const perPerson = document.getElementById('per-person');
const totalBill = document.getElementById('total-bill');
const saveBtn = document.getElementById('save-btn');
const addReceipt = document.getElementById('add-Receipt');
const deleteBtn = document.getElementById('delete-btn');
// console.log(bill, numberOfPeople);
let total = 0,
    perPersonBill = 0,
    storage = [];

const increaseTip = () => {
    checkInputs();
    if (tipPercentage.value === '') {
        tipPercentage.value = 0;
    }
    if (parseInt(tipPercentage.value) === 100) {
        tipPercentage.value = 0;
    } else {
        tipPercentage.value++;
    }
    // console.log(tipPercentage.value);
    calculate();
};

const decreaseTip = () => {
    checkInputs();
    if (tipPercentage.value === '') {
        tipPercentage.value = 1;
    }
    if (tipPercentage.value == 0) {
        tipPercentage.value = 0;
    } else {
        tipPercentage.value--;
    }
    // console.log(tipPercentage.value);
    calculate();
};

const increasePeople = () => {
    checkInputs();
    if (numberOfPeople.value === '') {
        numberOfPeople.value = 0;
    }
    if (parseInt(numberOfPeople.value) === 100) {
        numberOfPeople.value = 1;
    } else {
        numberOfPeople.value++;
    }
    // console.log(numberOfPeople.value);
    calculate();
};

const decreasePeople = () => {
    checkInputs();
    if (numberOfPeople.value === '') {
        numberOfPeople.value = 2;
    }
    if (numberOfPeople.value == 1) {
        numberOfPeople.value = 1;
    } else {
        numberOfPeople.value--;
    }
    // console.log(numberOfPeople.value);
    calculate();
};

const calculate = () => {
    perPersonBill = (
        (parseInt(bill.value) * (parseInt(tipPercentage.value) / 100)) /
        parseInt(numberOfPeople.value)
    ).toFixed(2);
    perPerson.innerHTML = perPersonBill;
    total = (
        (parseInt(bill.value) +
            parseInt(bill.value * (parseInt(tipPercentage.value) / 100))) /
        parseInt(numberOfPeople.value)
    ).toFixed(2);
    totalBill.innerText = total;
};

const saveReceipt = () => {
    console.log(typeof perPersonBill, total);
    if (
        perPersonBill === 'NaN' ||
        perPersonBill === 'Infinity' ||
        total === 'NaN' ||
        total === 'Infinity' ||
        perPersonBill === 0 ||
        total === 0 ||
        (perPersonBill === '0.00' && total === '0.00')
    ) {
        console.log('Hell');
    } else {
        storage.push({ perPersonBill, total });
        localStorage.setItem('Receipts', JSON.stringify(storage));
        addDataToReceipt();
        bill.value = 0;
        tipPercentage.value = 0;
        numberOfPeople.value = 1;
        perPerson.innerHTML = '0.00';
        totalBill.innerHTML = '0.00';
        perPersonBill = 0;
        total = 0;
    }
};

const getLocalReceipt = () => {
    console.log(localStorage.getItem('Receipts'));
    if (localStorage.getItem('Receipts') === null) {
        localStorage.setItem('Receipts', JSON.stringify([]));
    } else {
        let LocalReceipts = JSON.parse(localStorage.getItem('Receipts'));
        storage = LocalReceipts;
    }
};
const addDataToReceipt = () => {
    addReceipt.innerHTML = `${storage
        .map(
            (data) =>
                `<li>
               
                    <span>Tip Per Person</span>
               
           
                <span>${data.perPersonBill}</span>
                <br/>
             
                    <span>Total Per Person</span>
                    
             
                <span>${data.total}</span>
            </li>`
        )
        .join('')}`;
};

const deleteAllReceipts = () => {
    localStorage.removeItem('Receipts');
    storage = [];
    addDataToReceipt();
};

const checkInputs = () => {
    if (bill.value < 0 || bill.value === '') {
        bill.value = 0;
    }
    if (tipPercentage.value < 0 || tipPercentage.value === '') {
        tipPercentage.value = 0;
    }
    if (numberOfPeople.value <= 0 || numberOfPeople.value === '') {
        numberOfPeople.value = 1;
    }
    calculate();
};

window.onload = () => {
    getLocalReceipt();
    addDataToReceipt();
};

bill.addEventListener('input', () => checkInputs());
tipPercentage.addEventListener('input', () => checkInputs());
numberOfPeople.addEventListener('input', () => checkInputs());
tipPlus.addEventListener('click', () => increaseTip());
tipMinus.addEventListener('click', () => decreaseTip());
peoplePlus.addEventListener('click', () => increasePeople());
peopleMinus.addEventListener('click', () => decreasePeople());
saveBtn.addEventListener('click', () => saveReceipt());
deleteBtn.addEventListener('click', () => deleteAllReceipts());
