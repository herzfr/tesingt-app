export interface User {
  username: string;
  password: string;
}

export class UserData {
  username?: string;
  password?: string;

  constructor(private u: string, private p: string) {
    this.username = u;
    this.password = p;
  }
}
