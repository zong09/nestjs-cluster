import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { HealthResponse } from './common/models/health.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  async getHealth(): Promise<HealthResponse> {
    const response = new HealthResponse();
    response.status_code = HttpStatus.OK.toString();
    response.message = 'Success';
    response.health = this.appService.healthCheck();
    return response;
  }
}
