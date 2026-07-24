import { InputType, Field, Int } from '@nestjs/graphql';
import { EstadosTask } from '../enums/task-estados-enums';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  titulo!: string;

  @Field(() => String, { nullable: true })
  descripcion?: string;

  @Field(() => EstadosTask)
  estado?: EstadosTask;

  @Field(() => [String])
  etiquetas!: string[];

  @Field(() => Int)
  idUsuario!: number;

  @Field(() => Int)
  idProyecto!: number;

}
