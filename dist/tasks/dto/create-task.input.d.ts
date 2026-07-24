import { EstadosTask } from '../enums/task-estados-enums';
export declare class CreateTaskInput {
    titulo: string;
    descripcion?: string;
    estado?: EstadosTask;
    etiquetas: string[];
    idUsuario: number;
    idProyecto: number;
}
