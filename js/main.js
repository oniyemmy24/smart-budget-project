import Budget from "./Budget.js";
import Expense from "./Expense.js";
import Storage from "./Storage.js";
import UI from "./UI.js";
import PriceAPI from "./PriceAPI.js";

const savedBudget = Storage.load("budget") || new Budget(0);
const budget = new Budget(savedBudget.amount);
budget.expenses = savedBudget.expenses || [];

// Budget Form
const budgetForm = document.getElementById("budget-form");
if (budgetForm) {
  budgetForm.addEventListener("submit", e => {
    e.preventDefault();
    const value = document.getElementById("budget-input").value;
    budget.amount = parseFloat(value);
    Storage.save("budget", budget);
    UI.showMessage("Budget saved successfully!", "budget-message");
  });
}

// Expense Form
const expenseForm = document.getElementById("expense-form");
if (expenseForm) {
  UI.renderExpenses(budget.expenses);
  UI.updateSummary(budget);

  expenseForm.addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    if (!title || amount <= 0) {
      alert("Please enter valid data");
      return;
    }

    const expense = new Expense(title, amount, category);
    budget.addExpense(expense);

    Storage.save("budget", budget);
    UI.renderExpenses(budget.expenses);
    UI.updateSummary(budget);

    expenseForm.reset();
  });

  // Delete Event (Event Delegation)
  document.getElementById("expense-list").addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset.id);
      budget.deleteExpense(id);
      Storage.save("budget", budget);
      UI.renderExpenses(budget.expenses);
      UI.updateSummary(budget);
    }
  });
}

// Filter Feature
const filterInput = document.getElementById("filter");
if (filterInput) {
  filterInput.addEventListener("input", e => {
    const filtered = budget.expenses.filter(exp =>
      exp.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    UI.renderExpenses(filtered);
  });
}

// Price API
const checkPriceBtn = document.getElementById("check-price");
if (checkPriceBtn) {
  checkPriceBtn.addEventListener("click", async () => {
    const product = document.getElementById("product-name").value;
    document.getElementById("price-result").textContent = "Loading...";
    const price = await PriceAPI.fetchPrice(product);
    document.getElementById("price-result").textContent = `Price: ₦${price}`;
  });
}
