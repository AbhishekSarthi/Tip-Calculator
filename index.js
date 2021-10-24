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
    }

    calculate = () => {
        this.perPersonBill = (
            (parseInt(this.bill.value) *
                (parseInt(this.tipPercentage.value) / 100)) /
            parseInt(this.numberOfPeople.value)
        ).toFixed(2);
        this.perPerson.innerHTML = '$' + this.perPersonBill;
        this.total = (
            (parseInt(this.bill.value) +
                parseInt(
                    this.bill.value * (parseInt(this.tipPercentage.value) / 100)
                )) /
            parseInt(this.numberOfPeople.value)
        ).toFixed(2);
        this.totalBill.innerText = '$' + this.total;
        console.log(this.perPersonBill, this.total);
    };

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
        console.log(this.tipPercentage.value);
        // calculate();
    };

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
        // console.log(this.tipPercentage.value);
        this.calculate();
    };

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
        // console.log(numberOfPeople.value);
        this.calculate();
    };

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
        // console.log(this.numberOfPeople.value);
        this.calculate();
    };

    saveReceipt = () => {
        console.log(typeof this.perPersonBill, this.total);
        if (
            this.perPersonBill === 'NaN' ||
            this.perPersonBill === 'Infinity' ||
            this.total === 'NaN' ||
            this.total === 'Infinity' ||
            this.perPersonBill === 0 ||
            this.total === 0 ||
            (this.perPersonBill === '0.00' && this.total === '0.00')
        ) {
            console.log('Hell');
        } else {
            this.storage.push({
                perPersonBill: this.perPersonBill,
                total: this.total,
            });
            localStorage.setItem('Receipts', JSON.stringify(this.storage));
            this.addDataToReceipt();
            this.bill.value = 0;
            this.tipPercentage.value = 0;
            this.numberOfPeople.value = 1;
            this.perPerson.innerHTML = '0.00';
            this.totalBill.innerHTML = '0.00';
            this.perPersonBill = 0;
            this.total = 0;
        }
        this.deleteBtn.style.display = '';
    };

    getLocalReceipt = () => {
        console.log(localStorage.getItem('Receipts'));
        if (localStorage.getItem('Receipts') === null) {
            localStorage.setItem('Receipts', JSON.stringify([]));
        } else {
            let LocalReceipts = JSON.parse(localStorage.getItem('Receipts'));
            this.storage = LocalReceipts;
        }
    };
    addDataToReceipt = () => {
        this.addReceipt.innerHTML = `${this.storage
            .map(
                (data) =>
                    `<li>
                
                    <span>Tip Per Person : </span>
        
            
                <span>${data.perPersonBill}</span>
                <br/>
            
                    <span>Total Per Person : </span>
                    
            
                <span>${data.total}</span>
            </li>`
            )
            .join('')}`;
    };

    deleteAllReceipts = () => {
        localStorage.removeItem('Receipts');
        this.storage = [];
        this.addDataToReceipt();
        this.deleteBtn.style.display = 'none';
    };

    test = () => {
        console.log(this.tipPercentage, this.numberOfPeople.value);
    };
}

let T = new TipCalculator();

window.onload = () => {
    T.getLocalReceipt();
    T.addDataToReceipt();
};

T.bill.addEventListener('input', () => T.checkInputs());
T.tipPercentage.addEventListener('input', () => T.checkInputs());
T.numberOfPeople.addEventListener('input', () => T.checkInputs());
T.tipPlus.addEventListener('click', () => T.increaseTip());
T.tipMinus.addEventListener('click', () => T.decreaseTip());
T.peoplePlus.addEventListener('click', () => T.increasePeople());
T.peopleMinus.addEventListener('click', () => T.decreasePeople());
T.saveBtn.addEventListener('click', () => T.saveReceipt());
T.deleteBtn.addEventListener('click', () => T.deleteAllReceipts());

// T.increaseTip();
// T.increaseTip();
// T.increaseTip();
// T.increaseTip();
