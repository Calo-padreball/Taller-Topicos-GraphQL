import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsuarioInput {
  @Field(() => String)
  nombre!: string;

  @Field(() => String)
  apellido!: string;

  @Field(() => String)
  correo!: string;

  @Field(() => String, { nullable: true })
  telefono?: string;
}