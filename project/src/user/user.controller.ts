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

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body) {
    return { body };
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
  async update(@Body() body, @Param() params) {
    return { body, params, method: 'PUT' };
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
