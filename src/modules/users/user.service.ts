import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../common/logger/app.logger.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(private logger: AppLogger) {
    this.logger.setContext(UserService.name);
  }

  async findOne(username: string): Promise<User | undefined> {
    this.logger.logCluster(`Find user : ${username}`);
    return this.users.find((user) => user.username === username);
  }
}
