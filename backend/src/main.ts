import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { HttpExceptionFilter } from './core/filters/http.exception.filter';
import { AllExceptionsFilter } from './core/filters/all.exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todos los endpoints
  app.setGlobalPrefix('api');

  // Implementación de versionado de API
  app.enableVersioning({
    type: VersioningType.URI, // Formato: /api/v1/recursos
    defaultVersion: '1',
  });

  // Configuración de seguridad con helmet
  app.use(helmet());

  // Compresión de respuestas para mejorar rendimiento
  app.use(compression());

  // Habilitar CORS para permitir acceso desde el frontend
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Añadir estas líneas en el archivo main.ts, después de app.useGlobalPipes
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter());

  // Añadir esta línea en el archivo main.ts, después de app.useGlobalPipes
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Agua Nueva')
    .setDescription('API para la aplicación web de Agua Nueva, una aplicación web del Cabildo de Fuerteventura')
    .setVersion('1.0.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Puerto de la aplicación (con fallback a 3000)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicación inicializada en puerto: ${port}`);
}
bootstrap();