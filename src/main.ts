import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  
  await app.listen(port);

  logger.log(`---------------------------------------------------------------------------`);
  logger.log(`INICIALIZADO CON EXITO`)
  logger.log(`El servidor esta corriendo en:http://localhost:${port}`);
  logger.log(`Playground disponible en: http://localhost:${port}/graphql`); 
  logger.log(`---------------------------------------------------------------------------`)
}
bootstrap();

