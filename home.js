var income = document.getElementById('income')
var expenseAmount = document.getElementById('expenseAmount')
var expenseType = document.getElementById('expenseType')
var balanceAmt = document.getElementById('balanceAmt');
var spendAmt = document.getElementById('spendAmt')
var incomeType = document.getElementById('incomeType')
var UserName = document.getElementById('UserName');
var UserEmail = document.getElementById('UserEmail');
var Uname = JSON.parse(localStorage.getItem('unameKey'));
var clearBtn = document.getElementById('clear');
balance = JSON.parse(localStorage.getItem(`income_${Uname}`));
var loader = document.getElementById('preloader');

// preloader loading
window.addEventListener('load', () => {
    loader.classList.add('d-none');
});

// geting emailid from localstorage
UserName.innerHTML = JSON.parse(localStorage.getItem('unameKey'));
UserName.innerHTML = `Welcome ${UserName.innerHTML.toUpperCase()}`;
UserName.addEventListener('mouseenter', () => {
    UserName.innerHTML = JSON.parse(localStorage.getItem(UserName.innerText.toLowerCase())).email;
})
UserName.addEventListener('mouseleave', () => {
    UserName.innerHTML = JSON.parse(localStorage.getItem('unameKey'));
    UserName.innerHTML = UserName.innerHTML.toUpperCase();
})
// format Date Function
function formatDate(date) {
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    let time = date.toLocaleTimeString();
    return `${day}/${month}/${year} - ${time}`;
}
// clear button effect
clearBtn.addEventListener('mouseenter', () => {
    clear.innerHTML = `Clear All <i class="fa-solid fa-broom"></i>`
    // clear.classList.add('text-light')
    clear.classList.add('active')
})
clearBtn.addEventListener('mouseleave', () => {
    clear.innerHTML = `Clear <i class="fa-solid fa-broom"></i>`
    // clear.classList.remove('text-light')
    clear.classList.remove('active')
})
// clear data functionality
function clearAll() {
    if (confirm('Do you want to clear all data?')) {
        localStorage.removeItem(`income_${Uname}`);
        localStorage.removeItem(`expns_${Uname}`);
        location.reload();
    }
}
// submit income
function submitIncome() {
    amt = income.value
    amtType = incomeType.value
    newDate = new Date();
    date = formatDate(newDate);
    let addMoney = {
        amt,
        amtType,
        date
    }
    amtArr = [];
    if (amt !== '' && amtType !== '') {

        Temp = JSON.parse(localStorage.getItem(`income_${Uname}`))
        if (Temp !== null) {
            Temp.forEach(a => amtArr.push(a))
        }
        amtArr.push(addMoney);
        localStorage.setItem(`income_${Uname}`, JSON.stringify(amtArr));
        alert('Income added successfully')
        location.reload();

        // console.log(addMoney);
        // localStorage.setItem('income',JSON.stringify(addMoney))
        // console.log(income.value);
        // localStorage.setItem('income',income.value)

    }
    else {
        alert('Enter amount!!')
    }
}
if (balance === null) {
    balanceAmt.innerHTML = 0;
    renderPieChart(balanceAmt.innerText, spendAmt.innerText);
}
else {
    sum = 0;
    balance.forEach(a => sum += Number(a.amt))
    balanceAmt.innerHTML = sum;
    renderPieChart(balanceAmt.innerText, spendAmt.innerText);
}
spendAmt.innerText = 0;
renderPieChart(balanceAmt.innerText, spendAmt.innerText);


document.getElementById('error-message').classList.add('d-none');
// submit expense function
function submitExpense() {
    e = expenseAmount.value;
    t = expenseType.value;
    newDate2 = new Date();
    date2 = formatDate(newDate2);;
    let expense = {
        e,
        t,
        date2
    }
    exps = [];
    if (Number(balanceAmt.innerText) - e < 0) {
        // alert("insufficient balance");
        document.getElementById('error-message').classList.remove('d-none');
        document.getElementById('error-message').innerHTML = "Insufficient balance!";
    }
    else {

        if (e !== '' && t !== '') {
            Expns = JSON.parse(localStorage.getItem(`expns_${Uname}`))
            if (Expns !== null) {
                Expns.forEach(a => exps.push(a))
            }
            exps.push(expense);
            localStorage.setItem(`expns_${Uname}`, JSON.stringify(exps))
            alert(`submitted`)
            location.reload();
        }
        else {
            alert('Enter amount!!')
        }
        // localStorage.setItem('Expense',JSON.stringify(expense));
    }
}
exp = JSON.parse(localStorage.getItem(`expns_${Uname}`));
if (exp !== null) {
    let spent = 0;
    exp.forEach(a => {
        spent += Number(a.e);
    });
    balanceAmt.innerText -= spent;
    spendAmt.innerText = Number(spent);
    renderPieChart(balanceAmt.innerText, spendAmt.innerText);
}

// logout function
function logout() {
    // localStorage.removeItem(`income_${Uname}`);
    // localStorage.removeItem(`expns_${Uname}`);
    localStorage.removeItem(`unameKey`);

    window.location = './index.html'
}

// table data section
if (balance !== null) {
    total = 0;
    balance.forEach(a => {
        IncomeTable.innerHTML += `
                    <tr>
                    <td ><b>${a.amtType}</b></td>
                      <td class="text-success">+${a.amt}</td>
                      <td>${total += Number(a.amt)}</td>
                      <td class="text-secondary">${String(a.date)}</td>
                    </tr>
        `
    });
}

if (exp !== null) {
    tempSum = sum;
    exp.forEach(a => {
        tempSum -= a.e;
        ExpenseTable.innerHTML += `
                    <tr>
                    <td ><b>${a.t}</b></td>
                      <td class="text-danger">-${a.e}</td>
                      <td>${tempSum}</td>
                      <td class="text-secondary">${a.date2}</td>
                    </tr>
        `
    });
}
// display more section
var table_box1 = document.getElementById('table_box1');
var table_box2 = document.getElementById('table_box2')
var tableContainer = document.getElementById('tableContainer');
function viewMore() {
    // table_box1.classList.toggle('d-none')
    // table_box2.classList.toggle('d-none')
    tableContainer.classList.toggle('d-none');
    if (tableContainer.classList.contains('d-none')) {
        viewmore.innerText = 'View More';
    }
    else {
        viewmore.innerText = 'View Less';
    }
}
user_wrapper = document.getElementById('user_wrapper');
user_wrapper.addEventListener('mouseenter', () => {
    user_wrapper.classList.add('bg-light')
    user_wrapper.classList.add('border')
});
user_wrapper.addEventListener('mouseleave', () => {
    user_wrapper.classList.remove('bg-light')
    user_wrapper.classList.remove('border')
});

// scroll to top
var upBtn = document.getElementById('upBtn');

window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        upBtn.classList.remove('d-none');
    }
    else {
        upBtn.classList.add('d-none');
        upBtn.addEventListener('click', toTop);
    }
}
toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var modalCloseBtn = document.getElementById('modal-close-btn');
var modalSubmit = document.getElementById('modalSubmit');

var myPieChart;

// Define a function to render the pie chart
function renderPieChart(balance = 0, spent = 0) {
    if (balance == 0 && spent == 0) {
        document.getElementById('pieChart').style.display = 'none';
    }
    else {
        document.getElementById('pieChart').style.display = 'block';
    }

    var ctx = document.getElementById('pieChart').getContext('2d');

    // Check if there is an existing chart instance
    if (myPieChart) {
        myPieChart.destroy(); // Destroy the existing chart instance
    }

    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Balance', 'Spent'],
            datasets: [{
                data: [balance, spent],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)', // Balance color
                    'rgba(255, 99, 132, 0.8)' // Spent color
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Ensure the chart remains responsive
            legend: {
                display: true,
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Balance vs. Spent'
            }
        }
    });
}


// print details
function printDetails() {
    window.print();
}
