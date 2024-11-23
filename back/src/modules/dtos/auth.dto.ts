export class AuthDTO {
    readonly email: string;
    readonly password: string;

    constructor(email: string, password: string) {
        this.password = password;
        this.email = email;
    }
}
