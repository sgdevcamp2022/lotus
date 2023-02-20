import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());

  //Swagger settings
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Loatus Chat API')
    .setDescription('Chatting API for Loatus community')
    .setVersion('1.0')
    .addTag('Loatus')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  //server listening
  app.enableCors();
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`listening port is ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
