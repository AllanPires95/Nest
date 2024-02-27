import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService,
        private readonly prisma:PrismaService){}

    async createToken(){
        //return this.jwtService.sign();
    }

    async checkToken(){
        //return this.jwtService.verify();
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
        return user;
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
        await this.prisma.user.update({
            where:{
                id,
            },
            data:{
                password:password
            }
    }
    );
        return true;
    }
}