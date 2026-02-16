export default class UI {
  static renderExpenses(expenses) {
    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenses.forEach(expense => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.title} - ₦${expense.amount} (${expense.category})
        <button data-id="${expense.id}">Delete</button>
      `;
      list.appendChild(li);
    });
  }

  static updateSummary(budget) {
    document.getElementById("total-budget").textContent = budget.amount;
    document.getElementById("total-spent").textContent = budget.getTotalSpent();
    document.getElementById("remaining").textContent = budget.getRemaining();
  }

  static showMessage(message, elementId) {
    document.getElementById(elementId).textContent = message;
  }
}
