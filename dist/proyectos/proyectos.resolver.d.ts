import { ProyectosService } from './proyectos.service';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoInput } from './dto/create-proyecto.input';
import { UpdateProyectoInput } from './dto/update-proyecto.input';
export declare class ProyectosResolver {
    private readonly proyectosService;
    constructor(proyectosService: ProyectosService);
    findAll(): Proyecto[];
    findOne(id: number): Proyecto;
    createProyecto(input: CreateProyectoInput): Proyecto;
    updateProyecto(input: UpdateProyectoInput): Proyecto;
    removeProyecto(id: number): Proyecto;
}
