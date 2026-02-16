import Storage from "./Storage.js";

export default class Auth {
  static register(username, password) {
    const users = Storage.load("users") || [];
    users.push({ username, password });
    Storage.save("users", users);
  }

  static login(username, password) {
    const users = Storage.load("users") || [];
    return users.find(u => u.username === username && u.password === password);
  }
}
