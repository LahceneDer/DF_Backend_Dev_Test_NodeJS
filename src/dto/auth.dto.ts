import { IsNotEmpty, Length, } from "class-validator";

export interface UserPayload {
    _id: string;
    username: string;
}

export class UserAuthInputs {
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password
    }

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Length(6, 14)
    password: string;
}
