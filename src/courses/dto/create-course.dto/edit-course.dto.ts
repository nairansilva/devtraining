import { CreateCourseDto } from './create-course.dto';
import { PartialType } from '@nestjs/mapped-types';

export class EditCourseDto extends PartialType(CreateCourseDto) {}
