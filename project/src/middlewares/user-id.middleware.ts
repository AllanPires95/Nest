import { NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserIdCheckMiddleware', 'antes');
    if (isNaN(Number(req.params.userId)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    console.log('UserIdCheckMiddleware', 'depois');
    next();
  }
}
