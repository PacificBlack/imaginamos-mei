import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Imaginamos API MEI')
      .setDescription(
        'Se requiere construir un sistema de órdenes de servicio para una empresa que ofrece servicios de mantenimiento e instalación de soportes para televisores. Los clientes pueden hacer una solicitud de servicio generando un ticket a través del sistema, al cual se le debe generar un token y asignar a un técnico de forma aleatoria para que atienda la solicitud. Por último, los técnicos pueden ver las órdenes asignadas y es necesario contar con un endpoint que retorne los servicios del técnico en formato JSON con el listado.',
      )
      .setVersion('1.0')
      .build(),
  );
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
