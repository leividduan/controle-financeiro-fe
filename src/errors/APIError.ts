import { ResponseBody } from '../types/ResponseBody';
import { Response } from '../types/Response';

export default class APIError extends Error {
  response: Response;
  body: ResponseBody;

  constructor(response:Response, body:ResponseBody) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
