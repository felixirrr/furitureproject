import { reactive } from 'vue';
import axios from 'axios';

const defaultImages: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  2: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  3: 'https://images.unsplash.com/photo-1505693419148-433060e19611?auto=format&fit=crop&w=800&q=80',
  4: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
  5: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  6: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
};

const initialProducts = [
  { id: 1, title: 'Диван Честерфилд Премиум', costPrice: 35000, salePrice: 85000, stock: 8, image: defaultImages[1] },
  { id: 2, title: 'Кресло Сканди Кожаное', costPrice: 12000, salePrice: 28500, stock: 15, image: defaultImages[2] },
  { id: 3, title: 'Кровать Кинг-Сайз Бархат', costPrice: 42000, salePrice: 98000, stock: 5, image: defaultImages[3] },
  { id: 4, title: 'Стол Обеденный из Массива', costPrice: 18000, salePrice: 42000, stock: 10, image: defaultImages[4] },
  { id: 5, title: 'Шкаф-Купе с Подсветкой', costPrice: 28000, salePrice: 65000, stock: 6, image: defaultImages[5] },
  { id: 6, title: 'Диван Угловой Лофт', costPrice: 29000, salePrice: 69000, stock: 12, image: defaultImages[6] },
];

// Автоматически обновляем устаревшие записи с битыми картинками
let rawProducts = localStorage.getItem('furniture_products');
let productsList = initialProducts;

if (rawProducts) {
  try {
    const parsed = JSON.parse(rawProducts);
    productsList = parsed.map((p: any) => ({
      ...p,
      image: defaultImages[p.id] || p.image || defaultImages[1],
    }));
  } catch (e) {
    productsList = initialProducts;
  }
}

const savedSales = localStorage.getItem('furniture_sales');

export const store = reactive({
  products: productsList,
  sales: savedSales ? JSON.parse(savedSales) : [] as any[],

  get summary() {
    const totalRevenue = this.sales.reduce((acc, s) => acc + s.revenue, 0);
    const totalCost = this.sales.reduce((acc, s) => acc + s.cost, 0);
    const totalProfit = this.sales.reduce((acc, s) => acc + s.profit, 0);
    const margin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : '0';

    return {
      totalSalesCount: this.sales.length,
      totalRevenue,
      totalCost,
      totalProfit,
      profitMarginPercent: Number(margin),
    };
  },

  async sellProduct(product: any, isCredit: boolean) {
    if (product.stock <= 0) return;
    const cost = product.costPrice;
    let revenue = product.salePrice;
    let bankFee = 0;
    if (isCredit) {
      bankFee = revenue * 0.05;
      revenue = revenue - bankFee;
    }
    const profit = revenue - cost;

    const saleRecord = {
      id: Date.now(),
      title: product.title,
      image: defaultImages[product.id] || product.image || defaultImages[1],
      revenue: Math.round(revenue),
      cost: cost,
      profit: Math.round(profit),
      isCredit,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    this.sales.unshift(saleRecord);
    product.stock -= 1;
    localStorage.setItem('furniture_sales', JSON.stringify(this.sales));
    localStorage.setItem('furniture_products', JSON.stringify(this.products));

    try {
      await axios.post('http://localhost:3000/api/sales', { 
        userId: 1, 
        items: [{ productId: product.id, quantity: 1 }], 
        isCredit 
      });
    } catch (e) {}
  },

  resetData() {
    this.products = initialProducts;
    this.sales = [];
    localStorage.removeItem('furniture_sales');
    localStorage.removeItem('furniture_products');
    window.location.reload();
  }
});