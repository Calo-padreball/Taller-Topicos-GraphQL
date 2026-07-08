import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  
  // Definimos una Query simple que devuelve un texto (String)
  @Query(() => String, { name: 'hello', description: 'Un saludo de prueba' })
  getHello(): string {
    return '¡Servidor GraphQL corriendo con éxito en Calomane! 🚀';
  }
}