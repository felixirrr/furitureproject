export interface ProfitCalculationStrategy {
  calculate(costPrice: number, salePrice: number, quantity: number): {
    totalRevenue: number;
    totalCost: number;
    netProfit: number;
  };
}

// Стандартная продажа в салоне
export class StandardProfitStrategy implements ProfitCalculationStrategy {
  calculate(costPrice: number, salePrice: number, quantity: number) {
    const totalRevenue = salePrice * quantity;
    const totalCost = costPrice * quantity;
    const netProfit = totalRevenue - totalCost;
    return { totalRevenue, totalCost, netProfit };
  }
}

// Продажа в банковскую рассрочку (банк забирает 5% комиссии за эквайринг/кредитование)
export class BankCreditProfitStrategy implements ProfitCalculationStrategy {
  calculate(costPrice: number, salePrice: number, quantity: number) {
    const grossRevenue = salePrice * quantity;
    const bankCommission = grossRevenue * 0.05;
    const totalRevenue = grossRevenue - bankCommission;
    const totalCost = costPrice * quantity;
    const netProfit = totalRevenue - totalCost;
    return { totalRevenue, totalCost, netProfit };
  }
}