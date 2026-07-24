import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Proyecto {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  nombre!: string;

  @Field(() => String, { nullable: true })
  descripcion?: string;
}