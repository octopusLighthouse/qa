import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userPutReqDto } from './dto/request/user.put.dto';
import { User } from './entities/user.entity';
import { userRepository } from './user.repository';
import { userPostReqDto } from './dto/request/user.post.dto';
import { userQueryDto } from './dto/request/user.query.dto';
import { Pagination } from '../common/pagination';

@Injectable()
export class userService {
	constructor(
		@InjectRepository(userRepository)
		private readonly userRepository: userRepository,
	) {
	}

	async get(
		query: userQueryDto,
	) {
		const pagination = new Pagination(query.page, query.pageSize, 25);
		const [
			data,
			count,
		] = await this.userRepository.getusers(
			pagination,
			query.filter,
		);

		return {
			count,
			page: pagination.getPage(),
			pageSize: pagination.getPageSize(),
			data,
		}
	}
	
	async getOne(id: string) {
		return await this.userRepository.getuser(id);
	}
	
	async create(data: userPostReqDto) {
		const user = new user(data);
		return await this.userRepository.createuser(user);
	}
	
	async update(id: string, data: userPutReqDto) {
		const user = new user(data);
		return await this.userRepository.updateuser(id, user);
	}
	
	async delete(id: string) {
		return await this.userRepository.deleteuser(id);
	}
}
