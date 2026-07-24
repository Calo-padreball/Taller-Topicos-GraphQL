import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsuarioService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private readonly usuarioService: UsuarioService) {}

  //Query para consultar datos

  @Query(() => [Usuario], { name: 'obtenerTodosLosUsuarios' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Query(() => Usuario, { name: 'obtenerUsuarioPorId' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioService.findOne(id);
  }

  //Mutation para modificar datos

  @Mutation(() => Usuario, { name: 'crearUsuario' })
  createUsuario(@Args('createUsuarioInput') input: CreateUsuarioInput) {
    return this.usuarioService.create(input);
  }

  @Mutation(() => Usuario, { name: 'actualizarUsuario' })
  updateUsuario(@Args('updateUsuarioInput') input: UpdateUsuarioInput) {
    return this.usuarioService.update(input.id, input);
  }

  @Mutation(() => Usuario, { name: 'eliminarUsuario' })
  removeUsuario(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioService.remove(id);
  }
}