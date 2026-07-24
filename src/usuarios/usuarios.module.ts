import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';

@Module({
  providers: [UsuariosResolver, UsuarioService],
  exports: [UsuarioService],
})
export class UsuariosModule {}
