import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePathUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/Interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async readUsers() {
    return this.userService.readUsers();
  }
  @Get(':id')
  async read(@ParamId() id: number) {
    console.log({ id });
    return this.userService.read(id);
  }
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePathUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    // ParseIntPipe is a pipe that converts the id parameter to a number
    return this.userService.delete(id);
  }
}
