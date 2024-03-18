import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { request } from "http";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    [x: string]: any;
    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;
        try {
            const data = this.authService.checkToken((authorization ?? '') .split(' ')[1]);
            request.tokenPayload = data;
            return true;
    } catch (e) {
        return false;
          
     }
    } 
}   