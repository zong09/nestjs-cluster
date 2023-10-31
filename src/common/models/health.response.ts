import { ApiProperty } from '@nestjs/swagger';
import { ApiMessageResponse } from './api.message.response';

export class HealthResponse extends ApiMessageResponse {
  @ApiProperty()
  health: any;
}
