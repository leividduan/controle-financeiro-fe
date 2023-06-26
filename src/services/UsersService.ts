import HttpClient from './utils/HttpClient';

class UsersService {
  httpClient:HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:8000');
  }

  createUser(user: any) {
    const request: RequestInit = {
      body: user
    };

    return this.httpClient.post('/api/users/signup', request);
  }

  loginUser(user: any) {

    const request: RequestInit = {
      body: user,
    };

    return this.httpClient.post('/api/users/login', request);
  }
}

export default new UsersService();
