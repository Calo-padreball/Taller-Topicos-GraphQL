import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Usuario {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  nombre!: string;

  @Field(() => String)
  apellido!: string;

  @Field(() => String)
  correo!: string;

  @Field(() => String, { nullable: true })
  telefono?: string;
}