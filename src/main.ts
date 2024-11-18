import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-KEY',
        in: 'header',
      },
      'access-key',
    )
    .setTitle('Intern Project MAIN SERVICE')
    .setDescription('Intern Project MAIN SERVICE API')
    .addServer('http://localhost:9001')
    .addServer('https://intern-project/')
    .setVersion('1.0.0')
    .build();

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('document', app, document);

  await app.listen(PORT || 9001, () => {
    console.log(`Server is running on http://localhost:${PORT}/document#/`);
  });
}
bootstrap();
