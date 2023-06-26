import HttpClient from './utils/HttpClient';

class CategoryService {
  httpClient:HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:8000');
  }

  get() {
    return this.httpClient.get('/api/categories');
  }

  getById(id:number) {
    return this.httpClient.get(`/api/categories/${id}`);
  }

  createCategory(user: any) {
    const request: RequestInit = {
      body: user
    };

    return this.httpClient.post('/api/categories', request);
  }

  editCategory(user: any, id: number) {
    const request: RequestInit = {
      body: user
    };

    return this.httpClient.put(`/api/categories/${id}`, request);
  }

  delete(id:number) {
    return this.httpClient.delete(`/api/categories/${id}`);
  }
}

export default new CategoryService();
