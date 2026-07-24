import { OnModuleInit } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
export declare class TasksService implements OnModuleInit {
    private readonly rutaArchivo;
    onModuleInit(): void;
    private obtenerDatos;
    private guardarDatos;
    create(createTaskInput: CreateTaskInput): Task;
    findAll(): Task[];
    findOne(id: number): Task;
    update(id: number, updateTaskInput: UpdateTaskInput): Task;
    remove(id: number): Task;
}
