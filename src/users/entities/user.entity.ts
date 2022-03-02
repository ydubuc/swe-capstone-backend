import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SignUpDto } from '../../auth/dtos/sign-up.dto';
import * as uuid from 'uuid';

@Entity()
export class User {
    @PrimaryKey()
    id: string = uuid.v4();

    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Property({ unique: true })
    email: string;

    @Property()
    salt: string;

    @Property()
    password: string;

    @Property({
        onUpdate: () => new Date(),
        onCreate: () => new Date(),
    })
    updatedAt: Date;

    @Property({ onCreate: () => new Date() })
    createdAt: Date;

    constructor(signUpDto: SignUpDto) {
        this.firstName = signUpDto.firstName;
        this.lastName = signUpDto.lastName;
        this.email = signUpDto.email;
        // TODO: generate salt
        this.salt = 'generatedsalt123';
        // TODO: encrypt password
        this.password = this.salt + 'password123';
    }
}
