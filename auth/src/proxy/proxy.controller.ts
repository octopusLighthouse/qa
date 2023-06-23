import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Req, Res, UseGuards  } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('*')
  @UseGuards(AuthGuard('jwt'))
  async proxyGetRequest(@Req() req: Request) {
    const { url, headers } = req;
    return await this.proxyService.get(
      `http://zecq:5000/${url?.substring('/api/v1/'.length)}`,
      headers,
    );
  }

  @Post('*')
  @UseGuards(AuthGuard('jwt'))
  async proxyPostRequest(@Req() req: Request) {
    const { url, headers, body } = req;
    return await this.proxyService.post(
      `http://zecq:5000/${url?.substring('/api/v1/'.length)}`,
      body,
      headers,
    );    
  }
}
