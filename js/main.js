import Auth from "./Auth.js";
import Storage from "./Storage.js";
import Budget from "./Budget.js";
import Income from "./Income.js";
import Expense from "./Expense.js";
import PriceAPI from "./PriceAPI.js";
import ChartManager from "./ChartManager.js";

const currentUser = Storage.load("currentUser");

if (window.location.pathname.includes("dashboard.html")) {
  if (!currentUser) window.location.href = "index.html";

  const userData = Storage.load(currentUser) || new Budget();

  // Populate categories
  const categorySelect = document.getElementById("expense-category");
  userData.categories.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    categorySelect.appendChild(option);
  });

  document.getElementById("income-form").addEventListener("submit", e => {
    e.preventDefault();
    const income = new Income(
      document.getElementById("income-source").value,
      document.getElementById("income-amount").value
    );
    userData.addIncome(income);
    Storage.save(currentUser, userData);
    location.reload();
  });

  document.getElementById("expense-form").addEventListener("submit", e => {
    e.preventDefault();
    const expense = new Expense(
      document.getElementById("expense-title").value,
      document.getElementById("expense-amount").value,
      document.getElementById("expense-category").value,
      document.getElementById("expense-date").value,
      document.getElementById("expense-note").value
    );
    userData.addExpense(expense);
    Storage.save(currentUser, userData);
    location.reload();
  });

  document.getElementById("search-price").addEventListener("click", async () => {
    const results = await PriceAPI.search(
      document.getElementById("product-search").value
    );
    document.getElementById("price-result").textContent =
      results.map(p => `${p.title}: ₦${p.price}`).join(" | ");
  });

  document.getElementById("total-income").textContent = userData.getTotalIncome();
  document.getElementById("total-expense").textContent = userData.getTotalExpense();
  document.getElementById("remaining").textContent = userData.getRemaining();

  ChartManager.renderChart(userData.expenses);
}

// Auth Page
if (document.getElementById("register-form")) {
  document.getElementById("register-form").addEventListener("submit", e => {
    e.preventDefault();
    Auth.register(
      document.getElementById("reg-username").value,
      document.getElementById("reg-password").value
    );
    document.getElementById("auth-message").textContent = "Registered!";
  });

  document.getElementById("login-form").addEventListener("submit", e => {
    e.preventDefault();
    const user = Auth.login(
      document.getElementById("login-username").value,
      document.getElementById("login-password").value
    );

    if (user) {
      Storage.save("currentUser", user.username);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("auth-message").textContent = "Invalid login";
    }
  });
}
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
