export default class Budget {
  constructor() {
    this.income = [];
    this.expenses = [];
    this.categoryBudgets = {};
    this.categories = ["Food", "Transport", "Rent", "Medical", "Subscriptions"];
  }

  addIncome(income) { this.income.push(income); }
  addExpense(expense) { this.expenses.push(expense); }

  getTotalIncome() {
    return this.income.reduce((t, i) => t + i.amount, 0);
  }

  getTotalExpense() {
    return this.expenses.reduce((t, e) => t + e.amount, 0);
  }

  getRemaining() {
    return this.getTotalIncome() - this.getTotalExpense();
  }
}
