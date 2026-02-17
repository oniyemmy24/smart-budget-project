export default class Budget {
  constructor(amount = 0) {
    this.amount = amount;
    this.expenses = [];
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }

  deleteExpense(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);
  }

  getTotalSpent() {
    return this.expenses.reduce((total, e) => total + e.amount, 0);
  }

  getRemaining() {
    return this.amount - this.getTotalSpent();
  }
}
