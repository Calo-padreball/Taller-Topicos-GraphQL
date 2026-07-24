import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateProyectoInput } from './create-proyecto.input';

@InputType()
export class UpdateProyectoInput extends PartialType(CreateProyectoInput) {
  @Field(() => ID)
  id!: number;
}