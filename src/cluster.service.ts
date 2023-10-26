import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import * as os from 'os';
import { AppLogger } from './common/logger/app.logger.service';
const cluster = require('cluster');

const numCPUs = os.cpus().length;
@Injectable()
export class ClusterService {
  static readonly logger = new AppLogger(ClusterService.name);
  static buildCluster(callback: () => void): void {
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
      this.logger.log(`SUB SERVER (${process.pid}) IS RUNNING `);
      callback();
    }
  }
}
