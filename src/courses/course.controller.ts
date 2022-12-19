import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { CoursesService } from './courses.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EditCourseDto } from './dto/create-course.dto/edit-course.dto';
import { FindOneOptions } from 'typeorm';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    //@Param() params
    return this.coursesService.byId(id);
  }

  @Post()

  // @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body: CreateCourseDto) {
    this.coursesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: EditCourseDto) {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.coursesService.delete(id);
  }
}
