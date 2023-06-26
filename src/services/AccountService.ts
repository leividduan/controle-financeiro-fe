import HttpClient from './utils/HttpClient';

class AccountService {
  httpClient:HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:8000');
  }

  get() {
    return this.httpClient.get('/api/accounts');
  }

  getById(id:number) {
    return this.httpClient.get(`/api/accounts/${id}`);
  }

  createAccount(user: any) {
    const request: RequestInit = {
      body: user
    };

    return this.httpClient.post('/api/accounts', request);
  }

  editAccount(user: any, id: number) {
    const request: RequestInit = {
      body: user
    };

    return this.httpClient.put(`/api/accounts/${id}`, request);
  }

  delete(id:number) {
    return this.httpClient.delete(`/api/accounts/${id}`);
  }
}

export default new AccountService();
