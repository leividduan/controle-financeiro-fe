import HttpClient from './utils/HttpClient';

class TransactionService {
  httpClient:HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:8000');
  }

  get() {
    return this.httpClient.get('/api/transactions');
  }

  getById(id:number) {
    return this.httpClient.get(`/api/transactions/${id}`);
  }

  createTransaction(user: any) {
    const request: RequestInit = {
      body: user
    };

    return this.httpClient.post('/api/transactions', request);
  }

  editTransaction(user: any, id: number) {
    const request: RequestInit = {
      body: user
    };

    return this.httpClient.put(`/api/transactions/${id}`, request);
  }

  delete(id:number) {
    return this.httpClient.delete(`/api/transactions/${id}`);
  }
}

export default new TransactionService();
