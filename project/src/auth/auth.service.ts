import { BadGatewayException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";


@Injectable()
export class AuthService{

    private issure = 'login';
    private audience = 'users';

    constructor(private readonly jwtService: JwtService,
        private readonly prisma:PrismaService){}
        private readonly userService: UserService

    async createToken(user:User){
        return {
            acessToken: this.jwtService.sign({
            sub: user.id,
            name: user.name,
            email: user.email,
        }, {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: this.issure,
            audience: this.audience,
         }),
        }
    }

    async checkToken(token: string){
        try{
            const data = this.jwtService.verify(token, {
                issuer: this.issure,
                audience: this.audience,
            });
            return data;
        } catch (e) {
            throw new BadGatewayException(e)
        }
    }
    async isValidToken(token: string){
        try{
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(email:string, password:string){
        
       const user = await this.prisma.user.findFirst({
            where:{
                email:email,
                password:password
            }
        });
        if(!user){
            throw new UnauthorizedException('Email or password is incorrect');
        }
        return this.createToken(user);
    }
    async forget(email:string){
        const user = await this.prisma.user.findFirst({
            where:{
                email:email,
            }
        });
        if(!user){
            throw new UnauthorizedException('Email incorrect');
        }
        return true;
        
    }
    async reset(password:string, token:string){
        //validar o token, trocar a senhaa
        const id = 0;
        const user = await this.prisma.user.update({
            where:{
                id,
            },
            data:{
                password:password
            }
        }
    );
        return this.createToken(user);
    }

    async register(data: AuthRegisterDto){
        const user = await this.userService.create(data);
        return this.createToken(user);
    }
    
}