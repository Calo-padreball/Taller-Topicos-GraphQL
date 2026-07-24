import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoInput } from './dto/create-proyecto.input';
import { UpdateProyectoInput } from './dto/update-proyecto.input';

@Resolver(() => Proyecto)
export class ProyectosResolver {

  constructor(private readonly proyectosService: ProyectosService) {}

  //Query para consultar datos 

  @Query(() => [Proyecto], { name: 'obtenerTodosLosProyectos' })
  findAll() {
    return this.proyectosService.findAll();
  }

  @Query(() => Proyecto, { name: 'obtenerProyectoPorId' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.proyectosService.findOne(id);
  }

  //Mutation para modificar datos

  @Mutation(() => Proyecto, { name: 'crearProyecto' })
  createProyecto(@Args('createProyectoInput') input: CreateProyectoInput) {
    return this.proyectosService.create(input);
  }

  @Mutation(() => Proyecto, { name: 'actualizarProyecto' })
  updateProyecto(@Args('updateProyectoInput') input: UpdateProyectoInput) {
    return this.proyectosService.update(input.id, input);
  }

  @Mutation(() => Proyecto, { name: 'eliminarProyecto' })
  removeProyecto(@Args('id', { type: () => Int }) id: number) {
    return this.proyectosService.remove(id);
  }
}