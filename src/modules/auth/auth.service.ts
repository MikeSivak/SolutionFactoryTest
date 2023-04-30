import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { IAuth } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user: User = await this.userService.findOneByEmailOrPhone(username);
        if (!user) {
            return null;
        }
        const match: Boolean = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }
        const { password, ...result } = user.dataValues;
        return result;
    }

    public async login(user: any): Promise<IAuth> {
        const token: string = await this.generateToken(user);
        return { user, token };
    }

    public async create(user: UserDto): Promise<IAuth> {
        const pass: string = await this.hashPassword(user.password);
        const newUser: User = await this.userService.create({ ...user, password: pass });
        const { password, ...result } = newUser.dataValues;
        const token: string = await this.generateToken(result);
        return { user: result, token };
    }

    private async generateToken(user: any): Promise<string> {
        const token: string = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password: string): Promise<string> {
        const hash: string = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string): Promise<Boolean> {
        const match: Boolean = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}