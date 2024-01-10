import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Location API')
    .setDescription('Technical challenge')
    .setVersion('1.0')
    .addTag('location')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.APP_PORT || 3000;
  const logger = new Logger('Bootstrap');
  logger.log(`Running on ${PORT} port.`);
  await app.listen(PORT);
}

bootstrap();
