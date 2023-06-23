import { Injectable } from '@nestjs/common';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import axios from 'axios';

@Injectable()
export class ProxyService {
  async get(url: string, headers) {
    try {
      const response = await axios.get(url, { headers: headers });
      return response.data;
    } catch (error) {
      throw new Error(``);
    }
  }

  async post(url: string, data, headers) {
    try {
      const response = await axios.post(url, data, { headers: headers });
      return response.data;
    } catch (error) {
      throw new Error(``);
    }
  }
}
