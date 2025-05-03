// This is a minimal schema file to satisfy any imports in the server code
export const users = {};

export class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
}

export class InsertUser {
  constructor(username) {
    this.username = username;
  }
}
