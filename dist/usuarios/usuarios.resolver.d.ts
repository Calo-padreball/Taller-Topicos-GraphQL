import { UsuarioService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
export declare class UsuariosResolver {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    findAll(): Usuario[];
    findOne(id: number): Usuario;
    createUsuario(input: CreateUsuarioInput): Usuario;
    updateUsuario(input: UpdateUsuarioInput): Usuario;
    removeUsuario(id: number): Usuario;
}
