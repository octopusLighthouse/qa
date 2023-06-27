import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Req, Res, UseGuards, Query  } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { generateFakeData } from './fake.data';

@Controller('api/v1')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('*')
  @UseGuards(AuthGuard('jwt'))
  async proxyGetRequest(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Req() req: Request,
  ) {
    const { url, headers, query } = req;
    const providedModule = `${url?.substring('/api/v1/'.length)}`;
    const urlToSubServis = `http://zecq:5000/${providedModule}`;
    console.log(`Call to sub servis to url (GET): ${urlToSubServis}`);

    if (providedModule.includes('test')) {
      return generateFakeData(2000, page, pageSize, JSON.stringify(query));
    }

    return await this.proxyService.get(
      urlToSubServis,
      headers,
    );
  }

  @Post('*')
  @UseGuards(AuthGuard('jwt'))
  async proxyPostRequest(@Req() req: Request) {
    const { url, headers, body, query } = req;
    const urlToSubServis = `http://zecq:5000/${url?.substring('/api/v1/'.length)}`;
    console.log(`Call to sub service to url (POST): ${urlToSubServis}`);
    console.log(`Data to service: ${JSON.stringify(body)}`);
    return await this.proxyService.post(
      urlToSubServis,
      body,
      headers,
    );    
  }
}
