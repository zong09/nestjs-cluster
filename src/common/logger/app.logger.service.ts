import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as chalk from 'chalk';
const cluster = require('cluster');

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  logCluster(message: string) {
    super.log(`${chalk.blue(`[Node-${cluster.worker.id}]`)} ${chalk.green(message)}`);
  }
  metric(metricName: string): void {
    super.log('metric ' + metricName);
  }
}
