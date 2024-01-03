import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePathUserDTO } from './dto/update-patch-user.dto';

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
  async read(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }
  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { name, email, password, id, method: 'PUT' };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { name, email, password }: UpdatePathUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      name,
      email,
      password,
      method: 'patch',
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe is a pipe that converts the id parameter to a number
    return { id };
  }
}
