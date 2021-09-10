'use strict';

const billAmount = document.querySelector('#bill-amount');
const cashPaid = document.querySelector('#cash-paid');
const btnCheck = document.querySelector('#btn-check');
const lblMessage = document.querySelector('.lbl-message');
const noteCount = document.querySelectorAll('.count-notes');
const lblCashPaid = document.querySelector('#lbl-cash');
const btnNext = document.querySelector('#btn-next');
const denominationTable = document.querySelector('.change-table');

const denominations = [2000, 500, 100, 20, 10, 5, 1];

const hideMessage = () => {
  lblMessage.style.color = 'red';
  lblMessage.innerText = '';
  lblMessage.style.display = 'none';
};

const showMessage = message => {
  lblMessage.style.display = 'block';
  lblMessage.innerText = message;
};

const hidePanels = () => {
  lblCashPaid.style.display = 'none';
  cashPaid.style.display = 'none';
  btnCheck.style.display = 'none';
  denominationTable.style.display = 'none';
};

const validAmount = (value, field) => {
  if (Number(value) <= 0 || isNaN(value)) {
    if (isNaN(value)) {
      showMessage(`${field} should be a number!`);
    }
    if (Number(value) <= 0) {
      showMessage(`${field} should be a postive number!`);
    }
    return true;
  }
  return false;
};

hidePanels();

btnNext.addEventListener('click', () => {
  hideMessage();
  if (!validAmount(billAmount.value, 'Bill Amount')) {
    btnNext.style.display = 'none';
    lblCashPaid.style.display = 'block';
    cashPaid.style.display = 'block';
    btnCheck.style.display = 'block';
  }
});

btnCheck.addEventListener('click', () => {
  hideMessage();
  if (!validAmount(billAmount.value, 'Bill Amount')) {
    if (!validAmount(cashPaid.value, 'Cash Paid')) {
      if (Number(billAmount.value) > Number(cashPaid.value)) {
        showMessage('Wanna wash the plates! 🍽️');
      } else if (Number(billAmount.value) === Number(cashPaid.value)) {
        lblMessage.style.color = 'green';
        showMessage('No change needed! 🤝🏼');
        denominationTable.style.display = 'none';
      } else {
        denominationTable.style.display = 'block';
        let balanceAmount = cashPaid.value - billAmount.value;
        for (let i = 0; i < denominations.length; i++) {
          let returnedCount = Math.floor(balanceAmount / denominations[i]);
          balanceAmount %= denominations[i];
          noteCount[i].innerText = returnedCount;
        }
      }
    }
  }
});
