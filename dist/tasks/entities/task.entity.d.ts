import { EstadosTask } from '../enums/task-estados-enums';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
export declare class Task {
    idUnic: number;
    titulo: string;
    descripcion: string;
    estado: EstadosTask;
    etiquetas: string[];
    fechaCreada: Date;
    idUsuario: number;
    idProyecto: number;
    usuario?: Usuario;
    proyecto?: Proyecto;
}
