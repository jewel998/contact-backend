import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthDto } from './dto/health.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check the health of the application' })
  @ApiResponse({
    status: 200,
    description: 'The application is healthy.',
    type: HealthDto,
  })
  check(): HealthDto {
    return { status: 'ok' };
  }
}
