import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { EstadosTask } from '../enums/task-estados-enums';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';


@ObjectType()
export class Task {
  @Field(() => ID)
  idUnic!: number;

  @Field(() => String)
  titulo!: string;

  @Field(() => String)
  descripcion!: string;

  @Field(() => EstadosTask)
  estado!: EstadosTask;

  @Field(() => [String])
  etiquetas!: string[];
  
  @Field(() => Date)
  fechaCreada!: Date;

  @Field(() => Int)
  idUsuario!: number;

  @Field(() => Int)
  idProyecto!: number;

  @Field(() => Usuario, { nullable: true })
  usuario?: Usuario;

  @Field(() => Proyecto, { nullable: true })
  proyecto?: Proyecto;

}
