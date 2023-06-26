import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
// import { Pagination } from '../common/pagination';
import { userQueryFilterDto } from './dto/request/user.query.filter.dto';

export class UserRepository extends Repository<User> {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {
		super(userRepository.target, userRepository.manager, userRepository.queryRunner);
	}
	
	async getUser(id: string) {
		return await this.userRepository.findOneBy({ id });
	}

	async getByEmail(email: string) {
		return await this.userRepository.findOneBy({ email });
	}
	
	// async getusers(
	// 	pagination: Pagination,
	// 	filter: userQueryFilterDto,
	// ) {
	// 	const query = this.userRepository
	// 		.createQueryBuilder('user')

	// 	return await query
	// 		.limit(pagination.getPageSize())
	// 		.offset(pagination.getSkip())
	// 		.getManyAndCount();
	// }
	
	// async updateuser(id: string, data: User) {
	// 	return await this.userRepository.update({ id }, data);
	// }
	
	async createUser(data: User) {
		return await this.userRepository.save(data);
	}
	
	// async deleteuser(id: string) {
	// 	return await this.userRepository.delete({ id });
	// }
	
}
