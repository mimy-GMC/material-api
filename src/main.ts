import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('API d\'inventaire de matériel')
    .setDescription('API de gestion des matériels informatiques')
    .setVersion('1.0')
    .addTag('materials')
    .addTag('employees')
    .addTag('categories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document) //lien d'accès à la documentation Swagger;
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
