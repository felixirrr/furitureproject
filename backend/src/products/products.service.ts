import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async seedProducts() {
    const prismaAny = this.prisma as any;
    const count = await prismaAny.product.count();
    
    if (count === 0) {
      let cat = await prismaAny.category.findFirst();
      if (!cat) {
        cat = await prismaAny.category.create({ data: { name: 'Основной каталог' } });
      }

      await prismaAny.product.createMany({
        data: [
          { title: 'Диван Честерфилд Премиум', costPrice: 35000, salePrice: 85000, stock: 8, categoryId: cat.id },
          { title: 'Кресло Сканди Кожаное', costPrice: 12000, salePrice: 28500, stock: 15, categoryId: cat.id },
          { title: 'Кровать Кинг-Сайз Бархат', costPrice: 42000, salePrice: 98000, stock: 5, categoryId: cat.id },
          { title: 'Стол Обеденный из Массива', costPrice: 18000, salePrice: 42000, stock: 10, categoryId: cat.id },
          { title: 'Шкаф-Купе с Подсветкой', costPrice: 28000, salePrice: 65000, stock: 6, categoryId: cat.id },
          { title: 'Диван Угловой Лофт', costPrice: 29000, salePrice: 69000, stock: 12, categoryId: cat.id },
        ],
      });
    }
  }

  async getAll() {
    await this.seedProducts();
    return (this.prisma as any).product.findMany({ include: { category: true } });
  }

  async create(data: { title: string; costPrice: number; salePrice: number; stock: number; categoryId: number }) {
    return (this.prisma as any).product.create({ data });
  }
}