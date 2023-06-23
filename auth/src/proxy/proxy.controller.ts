import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import axios from 'axios';

@Controller('')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('settings')
  async create(
    @Headers('token') token: string,
    @Body() data: any) {
    try {
      console.log(` data ${JSON.stringify(data)}, token: ${token}`);
      const response = await axios.post('http://zecq:5000/settings', data, {
        headers: {
          token,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  @Get('settings')
  async findAll() {
    try {
      const response = await axios.get('http://zecq:5000/settings', {
        headers: {
          token: 123,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
