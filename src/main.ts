import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pack from '../package.json';
import { AppModule } from './app.module';
import { ClusterService } from './cluster.service';
import { ConfigKey } from './common/enum/config.key';
import { AppLogger } from './common/logger/app.logger.service';

function createSwagger(app: INestApplication, config: ConfigService, version: string, logApp: AppLogger) {
  const options = new DocumentBuilder()
    .setTitle(config.get(ConfigKey.SwaggerTitle))
    .setDescription(config.get(ConfigKey.SwaggerDescription))
    .addServer(config.get(ConfigKey.ApiDefaultPrefix))
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(config.get(ConfigKey.SwaggerPrefix), app, document);
  logApp.logCluster('Swagger is register on path : /' + config.get(ConfigKey.SwaggerPrefix));
}

async function bootstrap() {
  const appLogger = new AppLogger('Main');
  const version = pack.version || '';
  const app = await NestFactory.create(AppModule, {
    logger: appLogger,
  });
  const configService = app.get(ConfigService);
  if (configService.get(ConfigKey.SwaggerEnable) === 'true') {
    appLogger.logCluster('Initial Swagger');
    createSwagger(app, configService, version, appLogger);
  }

  await app.listen(+configService.get(ConfigKey.Port));
  appLogger.logCluster(configService.get(ConfigKey.SwaggerTitle) + ' listening on port ' + configService.get(ConfigKey.Port));
}

ClusterService.buildCluster(bootstrap);
