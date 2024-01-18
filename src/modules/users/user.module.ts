import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../../common/logger/app.logger.module';
import { UserService } from './user.service';

@Module({
  imports: [AppLoggerModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
