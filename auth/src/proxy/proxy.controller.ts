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
    const urlToSubServis = `http://zecq:5000/${url?.substring('/api/v1/'.length)}`;
    console.log(`Call to sub servis to url (GET): ${urlToSubServis}`);
    return await this.proxyService.get(
      urlToSubServis,
      headers,
    );
  }

  @Post('*')
  @UseGuards(AuthGuard('jwt'))
  async proxyPostRequest(@Req() req: Request) {
    const { url, headers, body } = req;
    const urlToSubServis = `http://zecq:5000/${url?.substring('/api/v1/'.length)}`;
    console.log(`Call to sub servis to url (POST): ${urlToSubServis}`);
    return await this.proxyService.post(
      urlToSubServis,
      body,
      headers,
    );    
  }
}
