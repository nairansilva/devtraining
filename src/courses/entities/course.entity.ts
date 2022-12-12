import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json', { nullable: true })
  tags: string[];
}
