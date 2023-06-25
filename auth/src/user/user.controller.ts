import { Controller, Get, Put, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { userService } from './user.service';
import { userPostReqDto } from './dto/request/user.post.dto';
import { userPutReqDto } from './dto/request/user.put.dto';
import { userQueryDto } from './dto/request/user.query.dto';


@Controller('users')
export class userController {
	constructor(private readonly userService: userService) {}

	@Get()
	async getuser(
		@Query() query: userQueryDto,
	) {
			return await this.userService.get(query);
	}

	@Get(':id')
	async getOneuser(
		@Param('id') userId: string,
	) {
			return await this.userService.getOne(userId);
	}

	@Post()
	async createuser(
		@Body() data: userPostReqDto,
	) {
			return await this.userService.create(data);
	}


}
