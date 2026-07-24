import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosResolver } from './proyectos.resolver';

@Module({
  providers: [ProyectosResolver, ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
