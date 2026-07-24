import { OnModuleInit } from '@nestjs/common';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoInput } from './dto/create-proyecto.input';
import { UpdateProyectoInput } from './dto/update-proyecto.input';
export declare class ProyectosService implements OnModuleInit {
    private readonly rutaArchivo;
    onModuleInit(): void;
    private obtenerDatos;
    private guardarDatos;
    create(input: CreateProyectoInput): Proyecto;
    findAll(): Proyecto[];
    findOne(id: number): Proyecto;
    update(id: number, input: UpdateProyectoInput): Proyecto;
    remove(id: number): Proyecto;
}
