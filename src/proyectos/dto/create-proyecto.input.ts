import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProyectoInput {
  @Field(() => String)
  nombreProyec!: string;

  @Field(() => String, { nullable: true})
  descriProyec?: string;
}
