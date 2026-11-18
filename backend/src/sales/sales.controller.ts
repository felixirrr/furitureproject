import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SalesService } from './sales.service';

@ApiTags('Продажи и Расчет прибыли')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Оформить продажу и рассчитать прибыль' })
  create(@Body() body: { userId: number; items: any[]; isCredit?: boolean }) {
    return this.salesService.createSale(body.userId, body.items, body.isCredit);
  }

  @Get()
  @ApiOperation({ summary: 'Получить историю продаж' })
  getAll() {
    return this.salesService.getAll();
  }
}