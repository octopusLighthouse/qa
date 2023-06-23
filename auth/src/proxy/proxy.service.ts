import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class ProxyService {
  async get(url: string, headers: IncomingHttpHeaders) {
    try {
      const response = await axios.get(url, { headers: headers });
      return response.data;
    } catch (error) {
      throw new Error(``);
    }
  }

  async post(url: string, data, headers: IncomingHttpHeaders) {
    try {
      const response = await axios.post(url, data, { headers: headers });
      return response.data;
    } catch (error) {
      throw new Error(``);
    }
  }
}
