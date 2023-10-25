import { Injectable } from '@nestjs/common';
import { AppLogger } from './common/logger/app.logger.service';

@Injectable()
export class AppService {
  private readonly logger = new AppLogger(AppService.name);

  getHello(): string {
    this.logger.logCluster('Hello World!');
    return 'Hello World!';
  }
}
