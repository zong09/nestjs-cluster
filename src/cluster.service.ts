import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import * as os from 'os';
import { ConfigKey } from './common/enums/config.key';
import { AppLogger } from './common/logger/app.logger.service';
const cluster = require('cluster');

let numCPUs = os.cpus().length;
@Injectable()
export class ClusterService {
  static readonly logger = new AppLogger(ClusterService.name);
  static readonly config = new ConfigService();
  static buildCluster(callback: () => void): void {
    if (this.config.get(ConfigKey.ClusterMode) === 'false') numCPUs = 1;
    if (cluster.isMaster) {
      this.logger.log(`NUMBER CPU (${numCPUs}) `);
      this.logger.log(`MAIN SERVER (${process.pid}) IS RUNNING `);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        this.logger.error(`worker is ${worker.process.pid} died ,code:${code}, signal:${signal}`);
      });
    } else {
      this.logger.log(`NODE (${process.pid}) IS RUNNING `);
      callback();
    }
  }
}
