import { Injectable } from '@nestjs/common';
import * as pack from '../package.json';
import { AppLogger } from './common/logger/app.logger.service';

@Injectable()
export class AppService {
  private readonly versionApp = pack.version || '';

  constructor(private logger: AppLogger) {
    this.logger.setContext(AppService.name);
  }

  healthCheck(): any {
    const response = {
      status: 'Alive',
      version: this.versionApp,
    };
    this.logger.logCluster(`Health check. App version ${this.versionApp}`);
    return response;
  }
}
