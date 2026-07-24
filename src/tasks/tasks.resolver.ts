import { Resolver, Query, Mutation, Args, Int , Parent, ResolveField  } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { UsuarioService } from '../usuarios/usuarios.service';
import { ProyectosService } from '../proyectos/proyectos.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usuariosService: UsuarioService,
    private readonly proyectosService: ProyectosService
  ) {}

  //Query para consultar datos 

  @Query(() => [Task], { name: 'obtenerTodasLasTareas' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'obtenerTareaPorId' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  //Mutation para modificar datos

  @Mutation(() => Task, { name: 'crearTarea' })
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @ResolveField(() => Usuario)
  usuario(@Parent() tarea: Task) {
    return this.usuariosService.findOne(tarea.idUsuario);
  }

  @ResolveField(() => Proyecto)
  proyecto(@Parent() tarea: Task) {
    return this.proyectosService.findOne(tarea.idProyecto);
  }
  
}