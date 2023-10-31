import { ConsoleLogger } from '@nestjs/common';
import * as chalk from 'chalk';
const cluster = require('cluster');

export class AppLogger extends ConsoleLogger {
  logCluster(message: string) {
    super.log(`${chalk.blue(`[Worker-${cluster.worker.id}]`)} ${chalk.green(message)}`);
  }
  metric(metricName: string): void {
    super.log('metric ' + metricName);
  }
}
