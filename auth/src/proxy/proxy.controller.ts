import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Req, Res  } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import axios from 'axios';
import { Request, Response } from 'express';

@Controller('api/v1')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  // @Post('settings')
  // async create(
  //   @Headers('token') token: string,
  //   @Body() data: any) {
  //   try {
  //     console.log(` data ${JSON.stringify(data)}, token: ${token}`);
  //     const response = await axios.post('http://zecq:5000/settings', data, {
  //       headers: {
  //         token,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // @Get('settings')
  // async findAll() {
  //   try {
  //     const response = await axios.get('http://zecq:5000/settings', {
  //       headers: {
  //         token: 123,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  @Get('*')
  async proxyGetRequest(@Req() req: Request, @Res() res: Response) {
    const { method, url, headers, body } = req;
    const innerUrl = `http://zecq:5000/${url.substring(8, url.length-8)}`;
    console.log(`InnerUrl: ${innerUrl}`);
    try {
      const response = await axios.get(innerUrl, { headers: headers });
      return response.data;
    } catch (error) {
      res.status(error.status).send(error);
    }
  }

  @Post('*')
  async proxyPostRequest(@Req() req: Request, @Res() res: Response) {
    const { method, url, headers, body } = req;
    const innerUrl = `http://zecq:5000/${url.substring(8, url.length-8)}`;
    console.log(`InnerUrl: ${innerUrl}`);
    try {
      const response = await axios.post(innerUrl, body, { headers: headers });
      return response.data;
    } catch (error) {
      res.status(error.status).send(error);
    }
  }
}
