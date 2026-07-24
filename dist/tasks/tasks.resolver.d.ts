import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { UsuarioService } from '../usuarios/usuarios.service';
import { ProyectosService } from '../proyectos/proyectos.service';
export declare class TasksResolver {
    private readonly tasksService;
    private readonly usuariosService;
    private readonly proyectosService;
    constructor(tasksService: TasksService, usuariosService: UsuarioService, proyectosService: ProyectosService);
    findAll(): Task[];
    findOne(id: number): Task;
    createTask(createTaskInput: CreateTaskInput): Task;
    usuario(tarea: Task): Usuario;
    proyecto(tarea: Task): Proyecto;
}
