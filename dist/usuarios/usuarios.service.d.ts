import { OnModuleInit } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
export declare class UsuarioService implements OnModuleInit {
    private readonly rutaArchivo;
    onModuleInit(): void;
    private obtenerDatos;
    private guardarDatos;
    create(createUsuarioInput: CreateUsuarioInput): Usuario;
    findAll(): Usuario[];
    findOne(id: number): Usuario;
    update(id: number, updateUsuarioInput: UpdateUsuarioInput): Usuario;
    remove(id: number): Usuario;
}
