class TipCalculator {
    constructor() {
        this.total = 0;
        this.perPersonBill = 0;
        this.storage = [];

        this.tipPercentage = document.getElementById('tipPercentage');
        this.numberOfPeople = document.getElementById('numberOfPeople');
        this.bill = document.getElementById('bill');
        this.tipMinus = document.getElementById('tipMinus');
        this.tipPlus = document.getElementById('tipPlus');
        this.peopleMinus = document.getElementById('peopleMinus');
        this.peoplePlus = document.getElementById('peoplePlus');
        this.perPerson = document.getElementById('per-person');
        this.totalBill = document.getElementById('total-bill');
        this.saveBtn = document.getElementById('save-btn');
        this.addReceipt = document.getElementById('add-Receipt');
        this.deleteBtn = document.getElementById('delete-btn');
        this.error = document.getElementsByClassName('error');
    }

    // Calculates tip per person and total per person
    calculate = () => {
        this.perPersonBill = (
            (parseFloat(this.bill.value) *
                (parseFloat(this.tipPercentage.value) / 100)) /
            parseInt(this.numberOfPeople.value)
        ).toFixed(2);
        this.perPerson.innerHTML = '$' + this.perPersonBill;
        this.total = (
            (parseFloat(this.bill.value) +
                parseFloat(
                    parseFloat(this.bill.value) *
                        (parseFloat(this.tipPercentage.value) / 100)
                )) /
            parseInt(this.numberOfPeople.value)
        ).toFixed(2);
        this.totalBill.innerText = '$' + this.total;

    };


    // Checks all inputs and avoids invalid input
    checkInputs = () => {
        if (this.bill.value < 0 || this.bill.value === '') {
            this.bill.value = 0;
        }
        if (this.tipPercentage.value < 0 || this.tipPercentage.value === '') {
            this.tipPercentage.value = 0;
        }
        if (
            this.numberOfPeople.value <= 0 ||
            this.numberOfPeople.value === ''
        ) {
            this.numberOfPeople.value = 1;
        }
        this.calculate();
    };

    // Increase Tip by value one by clicking on + button 
    increaseTip = () => {
        this.checkInputs();
        if (this.tipPercentage.value === '') {
            this.tipPercentage.value = 0;
        }
        if (parseInt(this.tipPercentage.value) === 100) {
            this.tipPercentage.value = 0;
        } else {
            this.tipPercentage.value++;
        }

        this.calculate();
    };

    // Decrease Tip by value one by clicking on - button 
    decreaseTip = () => {
        this.checkInputs();
        if (this.tipPercentage.value === '') {
            this.tipPercentage.value = 1;
        }
        if (this.tipPercentage.value == 0) {
            this.tipPercentage.value = 0;
        } else {
            this.tipPercentage.value--;
        }
 
        this.calculate();
    };

    // Increase Number of People by value one by clicking on + button 
    increasePeople = () => {
        this.checkInputs();
        if (this.numberOfPeople.value === '') {
            this.numberOfPeople.value = 0;
        }
        if (parseInt(this.numberOfPeople.value) === 100) {
            this.numberOfPeople.value = 1;
        } else {
            this.numberOfPeople.value++;
        }
        this.calculate();
    };

    // Decrease Number of People by value one by clicking on - button 
    decreasePeople = () => {
        this.checkInputs();
        if (this.numberOfPeople.value === '') {
            this.numberOfPeople.value = 2;
        }
        if (this.numberOfPeople.value == 1) {
            this.numberOfPeople.value = 1;
        } else {
            this.numberOfPeople.value--;
        }
        this.calculate();
    };

    // Save Data to local storage after checking output values
    saveReceipt = () => {

        if (
            parseFloat(this.perPersonBill) === 0 &&
            parseFloat(this.total) === 0
        ) {
            this.error[0].style.display = '';
        } else {
            this.storage.push({
                perPersonBill: this.perPersonBill,
                total: this.total,
                bill: parseFloat(this.bill.value),
                tipPercentage: this.tipPercentage.value,
                numberOfPeople: this.numberOfPeople.value,
            });
            localStorage.setItem('Receipts', JSON.stringify(this.storage));
            this.addDataToReceipt();
            this.bill.value = 0;
            this.tipPercentage.value = 0;
            this.numberOfPeople.value = 1;
            this.perPerson.innerHTML = '$0.00';
            this.totalBill.innerHTML = '$0.00';
            this.perPersonBill = 0;
            this.total = 0;
            this.error[0].style.display = 'none';
        }
        this.deleteBtn.style.display = '';
    };

    // Get local storage data on window load and adds to storage variable
    getLocalReceipt = () => {

        if (localStorage.getItem('Receipts') === null) {
            localStorage.setItem('Receipts', JSON.stringify([]));
        } else {
            let LocalReceipts = JSON.parse(localStorage.getItem('Receipts'));
            this.storage = LocalReceipts;
        }
        this.error[0].style.display = 'none';
    };

    // Adds local storage Data to receipt div
    addDataToReceipt = () => {
        this.addReceipt.innerHTML = `${this.storage
            .map(
                (data) =>
                    `<li>
                    <span>Bill : </span>
                    <span>${data.bill}</span>
                    <br/>
                    <span>Tip Percentage : </span>
                    <span>${data.tipPercentage}</span>
                    <br/>
                    <span>Number Of People : </span>
                    <span>${data.numberOfPeople}</span>
                    <br/>
                    <span>Tip Per Person : </span>
                    <span>${data.perPersonBill}</span>
                    <br/>
                    <span>Total Per Person : </span>
                    <span>${data.total}</span>
            </li>`
            )
            .join('')}`;
    };

    // Deletes all receipt data from local storage and receipt div
    deleteAllReceipts = () => {
        localStorage.removeItem('Receipts');
        this.storage = [];
        this.addDataToReceipt();
        this.deleteBtn.style.display = 'none';
    };

}

// Object initialization
let T = new TipCalculator();

// Runs on every window load
window.onload = () => {
    T.getLocalReceipt();
    T.addDataToReceipt();
};

// Event Listeners
T.bill.addEventListener('input', () => T.checkInputs());
T.tipPercentage.addEventListener('input', () => T.checkInputs());
T.numberOfPeople.addEventListener('input', () => T.checkInputs());
T.tipPlus.addEventListener('click', () => T.increaseTip());
T.tipMinus.addEventListener('click', () => T.decreaseTip());
T.peoplePlus.addEventListener('click', () => T.increasePeople());
T.peopleMinus.addEventListener('click', () => T.decreasePeople());
T.saveBtn.addEventListener('click', () => T.saveReceipt());
T.deleteBtn.addEventListener('click', () => T.deleteAllReceipts());
