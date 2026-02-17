export default class Expense {
  constructor(title, amount, category) {
    this.id = Date.now();
    this.title = title;
    this.amount = parseFloat(amount);
    this.category = category;
    this.date = new Date().toLocaleDateString();
  }
}
