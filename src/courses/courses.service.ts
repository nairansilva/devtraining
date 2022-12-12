import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  byId(id: FindOneOptions<Course>) {
    const course = this.courseRepository.findOne(id);
    if (!course) {
      // throw new HttpException(
      //   `Curso ${id} não encontrado`,
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException(`Curso ${id} não encontrado`);
    }
    return course;
  }

  create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  update(id: string, updateCourseDto: any) {
    const indexCourse = this.course.findIndex(
      (courseFind: Course) => courseFind.id == Number(id),
    );

    if (indexCourse >= 0) {
      this.course[indexCourse] = updateCourseDto;
      return updateCourseDto;
    } else {
      throw new HttpException(
        `Curso ${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  delete(id: string) {
    const indexCourse = this.course.findIndex(
      (courseFind: Course) => courseFind.id == Number(id),
    );

    if (indexCourse >= 0) {
      this.course.splice(indexCourse, 1);
    }
  }
}
