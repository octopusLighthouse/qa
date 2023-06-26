import { userQueryFilterDto } from './user.query.filter.dto';

export class userQueryDto {
	page: number;
	pageSize: number;
	filter: userQueryFilterDto;
}
