import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { email, name, password }: CreateUserDTO) {
    return { email, name, password };
  }

  @Get()
  async readUsers() {
    return { users: [] };
  }
  @Get(':id')
  async read(@Param() params) {
    return { user: {}, params };
  }
  @Put(':id')
  async update(
    @Body() { email, name, password }: UpdatePutUserDTO,
    @Param() params,
  ) {
    return { name, email, password, params, method: 'PUT' };
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param() params) {
    return { body, params, method: 'PATCH' };
  }
  @Delete(':id')
  async delete(@Param() params) {
    return { user: {}, params };
  }
}
