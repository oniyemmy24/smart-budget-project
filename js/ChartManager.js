export default class ChartManager {
  static renderChart(expenses) {
    const ctx = document.getElementById("expenseChart");

    const categories = {};
    expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(categories),
        datasets: [{
          data: Object.values(categories)
        }]
      }
    });
  }
}
