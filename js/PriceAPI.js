export default class PriceAPI {
  static async search(product) {
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${product}`);
      const data = await res.json();
      return data.products.slice(0,3);
    } catch (err) {
      return [];
    }
  }
}
