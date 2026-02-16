export default class Expense {
  constructor(title, amount, category, date, note) {
    this.id = Date.now();
    this.title = title;
    this.amount = parseFloat(amount);
    this.category = category;
    this.date = date;
    this.note = note;
  }
}

