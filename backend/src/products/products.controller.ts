import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Товары (Мебель)')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех наименований мебели' })
  getAll() {
    return this.productsService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Добавить новую позицию мебели' })
  create(@Body() body: any) {
    return this.productsService.create(body);
  }
}