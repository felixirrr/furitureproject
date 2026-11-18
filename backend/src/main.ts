import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Разрешаем запросы от Frontend
  app.setGlobalPrefix('api');

  // Документирование Swagger
  const config = new DocumentBuilder()
    .setTitle('Мебельный салон: Расчет прибыли')
    .setDescription('API для автоматизации продаж и аналитики прибыли')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Сервер мебельного салона запущен: http://localhost:${port}`);
  console.log(`Swagger документация: http://localhost:${port}/api/docs`);
}
bootstrap();