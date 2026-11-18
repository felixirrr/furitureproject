import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getSalonProfitSummary() {
    const prismaAny = this.prisma as any;
    
    // Считываем все продажи напрямую из базы данных
    const sales = await prismaAny.sale.findMany();

    if (!sales || sales.length === 0) {
      return {
        totalSalesCount: 0,
        totalRevenue: 0,
        totalCost: 0,
        totalProfit: 0,
        profitMarginPercent: 0,
      };
    }

    const totalRevenue = sales.reduce((acc: number, s: any) => acc + Number(s.totalAmount || 0), 0);
    const totalCost = sales.reduce((acc: number, s: any) => acc + Number(s.totalCost || 0), 0);
    const totalProfit = sales.reduce((acc: number, s: any) => acc + Number(s.totalProfit || 0), 0);
    const margin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    return {
      totalSalesCount: sales.length,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      totalProfit: Number(totalProfit.toFixed(2)),
      profitMarginPercent: Number(margin.toFixed(2)),
    };
  }
}