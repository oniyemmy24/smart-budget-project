let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentType = "expense";
let budget = localStorage.getItem("budget") || 0;

function switchType(type) {
  currentType = type;
}

function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!desc || !amount) return;

  transactions.push({
    desc,
    amount,
    type: currentType
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  closeModal();
  updateUI();
}

function updateUI() {
  const list = document.getElementById("transactions");
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${t.desc} <span>${t.type === "income" ? "+" : "-"}$${t.amount}</span>`;
    list.appendChild(li);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("income").innerText = "$" + income;
  document.getElementById("expense").innerText = "$" + expense;
  document.getElementById("balance").innerText = "$" + (income - expense);

  checkBudget(expense);
}

function setBudget() {
  budget = document.getElementById("budgetInput").value;
  localStorage.setItem("budget", budget);
  checkBudget();
}

function checkBudget(expense = 0) {
  if (budget > 0) {
    const remaining = budget - expense;
    document.getElementById("budgetStatus").innerText =
      remaining >= 0
        ? `Remaining Budget: $${remaining}`
        : `Budget Exceeded by $${Math.abs(remaining)}`;
  }
}

updateUI();
