const expenseTitle = document.getElementById('expenseTitle');
const expenseAmount = document.getElementById('expenseAmount');
const addExpenseButton = document.getElementById('addExpense');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(exp => createExpenseElement(exp.title, exp.amount));
    updateTotal();
}

function saveExpenses() {
    const expenses = [];
    document.querySelectorAll('.expense-item').forEach(item => {
        expenses.push({
            title: item.querySelector('.expense-title').innerText,
            amount: parseFloat(item.querySelector('.expense-amount').innerText)
        });
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateTotal();
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.expense-amount').forEach(span => {
        total += parseFloat(span.innerText);
    });
    totalAmount.innerText = total.toFixed(2);
}

function createExpenseElement(title, amount) {
    const li = document.createElement('li');
    li.className = 'expense-item';

    const spanTitle = document.createElement('span');
    spanTitle.className = 'expense-title';
    spanTitle.innerText = title;
    li.appendChild(spanTitle);

    const spanAmount = document.createElement('span');
    spanAmount.className = 'expense-amount';
    spanAmount.innerText = parseFloat(amount).toFixed(2);
    li.appendChild(spanAmount);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Delete';
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveExpenses();
    });

    expenseList.appendChild(li);
    saveExpenses();
}

addExpenseButton.addEventListener('click', () => {
    const title = expenseTitle.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    if (title !== '' && !isNaN(amount) && amount > 0) {
        createExpenseElement(title, amount);
        expenseTitle.value = '';
        expenseAmount.value = '';
    }
});

expenseAmount.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addExpenseButton.click();
    }
});

loadExpenses();
