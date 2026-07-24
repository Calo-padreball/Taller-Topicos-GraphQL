import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ProyectosModule } from '../proyectos/proyectos.module';

@Module({
  providers: [TasksResolver, TasksService],
  imports: [UsuariosModule, ProyectosModule],
})
export class TasksModule {}
