import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { Prisma } from "@prisma/client";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        JwtModule.register({
        secret: `Nea@]5+gSWWoRG@fsKOWD1xhku5O*>Aw`,
        signOptions: { expiresIn: '1d' }
    }),
    UserModule,
    PrismaModule,
    ],
    controllers: [AuthController],
})
export class AuthModule {}