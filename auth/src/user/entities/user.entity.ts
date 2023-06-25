import { Column, Entity, OneToMany, OneToOne, ManyToOne, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

interface UserCreate {
	email: string;
	passwordHash: string;
	role: string;
}

@Entity()
export class User {
	@PrimaryColumn({ length: 30 })
	id: string;

	@Column({ length: 255 })
	email: string;

	@Column({ length: 255 })
	passwordHash: string;

	@Column({ length: 255 })
	role: String;

	@Column()
	createdAt: Date;

	constructor(data: UserCreate) {
		this.id = uuidv4();
		this.email = data?.email;
		this.passwordHash = data?.passwordHash;
		this.role = data?.role;
		this.createdAt = moment().utc().toDate();
	}
}
