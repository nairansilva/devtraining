import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Define se só o que tiver tipado com os validadores no DTO será retornado nas requisições.
      forbidNonWhitelisted: true, //Se enviar uma propriedade q não esteja tipadano DTO, vai retornar erro
      transform: true, //tranformará os dados automáticos de acordo com o que estamos esperando no DTO... Faz um transform automático pra garantir os dados.
    }),
  );
  await app.listen(3000);
}
bootstrap();
