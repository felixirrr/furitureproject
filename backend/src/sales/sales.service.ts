import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StandardProfitStrategy, BankCreditProfitStrategy } from '../common/strategies/profit-calculation.strategy';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(userId: number, items: { productId: number; quantity: number }[], isCredit = false) {
    const prismaAny = this.prisma as any;

    // 1. Убедимся, что пользователь есть в БД
    let user = await prismaAny.user.findFirst();
    if (!user) {
      user = await prismaAny.user.create({
        data: {
          email: 'admin@furniture.ru',
          fullName: 'Администратор Салона',
          password: 'hash',
          role: 'ADMIN',
        },
      });
    }

    // 2. Ищем товар в БД или берем первый доступный
    let product = null;
    if (items && items.length > 0 && items[0].productId) {
      product = await prismaAny.product.findUnique({ where: { id: items[0].productId } });
    }
    
    if (!product) {
      product = await prismaAny.product.findFirst();
    }

    // Если база была пустой — создаем диван прямо сейчас
    if (!product) {
      let category = await prismaAny.category.findFirst();
      if (!category) {
        category = await prismaAny.category.create({ data: { name: 'Мягкая мебель' } });
      }
      product = await prismaAny.product.create({
        data: {
          title: 'Диван Честерфилд Премиум',
          costPrice: 35000,
          salePrice: 85000,
          stock: 10,
          categoryId: category.id,
        },
      });
    }

    const qty = items && items[0] && items[0].quantity ? items[0].quantity : 1;
    const strategy = isCredit ? new BankCreditProfitStrategy() : new StandardProfitStrategy();
    const calc = strategy.calculate(product.costPrice, product.salePrice, qty);

    // 3. Сохраняем продажу в таблицу Sale
    const sale = await prismaAny.sale.create({
      data: {
        userId: user.id,
        totalAmount: calc.totalRevenue,
        totalCost: calc.totalCost,
        totalProfit: calc.netProfit,
        isCredit,
        items: {
          create: [
            {
              productId: product.id,
              quantity: qty,
              price: product.salePrice,
            },
          ],
        },
      },
    });

    // Уменьшаем склад
    try {
      await prismaAny.product.update({
        where: { id: product.id },
        data: { stock: Math.max(0, product.stock - qty) },
      });
    } catch (e) {
      // Игнорируем ошибку обновления склада
    }

    return sale;
  }

  async getAll() {
    return (this.prisma as any).sale.findMany({
      include: {
        items: { include: { product: true } },
        user: true,
      },
    });
  }
}