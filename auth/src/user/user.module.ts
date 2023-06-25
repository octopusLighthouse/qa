import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userController } from './user.controller';
import { userService } from './user.service';
import { User } from './entities/user.entity';
import { userRepository } from './user.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User,
		]),
	],
	controllers: [
		userController,
	],
	providers: [
		userService,
		userRepository,
	],
})
export class userModule {}
