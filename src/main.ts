import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );
   const config = new DocumentBuilder()
   .setTitle('MyNoteApp')
   .setDescription('App for Notes')
   .setVersion('1.0')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
bootstrap();
