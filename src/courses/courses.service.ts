import { Tag } from './entities/tag.entity';
import { EditCourseDto } from './dto/create-course.dto/edit-course.dto';
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

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async byId(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id: +id },
      relations: ['tags'],
    });
    if (!course) {
      // throw new HttpException(
      //   `Curso ${id} não encontrado`,
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException(`Curso ${id} não encontrado`);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preLoadTagByName(name)),
    );
    const course = this.courseRepository.create({ ...createCourseDto, tags });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: EditCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preLoadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: +id, // o + converte a string pra numérico
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      // throw new HttpException(
      //   `Curso ${id} não encontrado`,
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException(`Curso ${id} não encontrado`);
    }

    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.courseRepository.findOne({ id: +id });

    if (!course) {
      throw new NotFoundException(`Curso ${id} não encontrado`);
    }

    this.courseRepository.remove(course);
    return `Id ${id} excluído com Sucesso!`;
  }

  private async preLoadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ name: name });

    if (tag) {
      return tag;
    } else {
      return this.tagRepository.create({ name: name });
    }
  }
}
