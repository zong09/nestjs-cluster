import { ApiProperty } from '@nestjs/swagger';

export class ApiMessageResponse {
  @ApiProperty()
  public status_code: string;
  @ApiProperty()
  public message: string;
}
