export default class PriceAPI {
  static async fetchPrice(product) {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${product}`);
      const data = await response.json();
      return data.products[0]?.price || "Not found";
    } catch (error) {
      console.error("API Error:", error);
      return "Error fetching price";
    }
  }
}
