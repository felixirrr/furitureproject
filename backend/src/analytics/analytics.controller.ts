import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Аналитика и Прибыль')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Сводный отчет по прибыли мебельного салона' })
  async getSummary() {
    return this.analyticsService.getSalonProfitSummary();
  }
}