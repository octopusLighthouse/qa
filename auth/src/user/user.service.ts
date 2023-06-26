import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { userPutReqDto } from './dto/request/user.put.dto';
// import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
// import { userPostReqDto } from './dto/request/user.post.dto';
// import { userQueryDto } from './dto/request/user.query.dto';
// import { Pagination } from '../common/pagination';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
	) {
	}

	// async get(
	// 	query: userQueryDto,
	// ) {
	// 	const pagination = new Pagination(query.page, query.pageSize, 25);
	// 	const [
	// 		data,
	// 		count,
	// 	] = await this.userRepository.getusers(
	// 		pagination,
	// 		query.filter,
	// 	);

	// 	return {
	// 		count,
	// 		page: pagination.getPage(),
	// 		pageSize: pagination.getPageSize(),
	// 		data,
	// 	}
	// }
	
	async getOne(id: string) {
		return await this.userRepository.getUser(id);
	}
	
	async create(data) {
		const user = new User(data);
		return await this.userRepository.createUser(user);
	}

	async getOneByEmail(email: string) {
		return await this.userRepository.getByEmail(email);
	}
	
	// async update(id: string, data: userPutReqDto) {
	// 	const user = new user(data);
	// 	return await this.userRepository.updateuser(id, user);
	// }
	
	// async delete(id: string) {
	// 	return await this.userRepository.deleteuser(id);
	// }
}
