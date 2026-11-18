<template>
  <div class="page-container">
    <div class="header-banner">
      <div class="banner-text">
        <h2>Финансовая Аналитика Мебельного Салона</h2>
        <p>Сводные показатели выручки, себестоимости и журнал проданных моделей.</p>
      </div>
      <button class="btn-reset" @click="store.resetData()">Сбросить данные</button>
    </div>

    <!-- Сводные финансовые плитки -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-title">Количество Сделок</div>
        <div class="stat-value">{{ store.summary.totalSalesCount }}</div>
      </div>
      <div class="stat-card green">
        <div class="stat-title">Выручка</div>
        <div class="stat-value">{{ formatPrice(store.summary.totalRevenue) }} ₽</div>
      </div>
      <div class="stat-card red">
        <div class="stat-title">Себестоимость</div>
        <div class="stat-value">{{ formatPrice(store.summary.totalCost) }} ₽</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-title">Чистая Прибыль</div>
        <div class="stat-value">{{ formatPrice(store.summary.totalProfit) }} ₽</div>
      </div>
    </div>

    <!-- Полоса рентабельности -->
    <div class="card margin-card">
      <h3>Рентабельность Продаж (Маржинальность Салона)</h3>
      <div class="margin-bar-container">
        <div class="margin-bar" :style="{ width: Math.min(100, Math.max(5, store.summary.profitMarginPercent)) + '%' }">
          {{ store.summary.profitMarginPercent }}%
        </div>
      </div>
      <p class="margin-desc">
        Показатель рассчитывается как отношение чистой прибыли к суммарной выручке салона за вычетом затрат и банковских комиссий.
      </p>
    </div>

    <!-- Журнал проданных товаров с фото -->
    <div class="card table-card" style="margin-top: 25px;">
      <h3>Журнал Совершенных Продаж</h3>
      <div v-if="store.sales.length === 0" class="empty">
        Нет данных о продажах. Перейдите в каталог и оформите первую продажу!
      </div>
      <div v-else class="sales-list">
        <div v-for="sale in store.sales" :key="sale.id" class="sale-item">
          <img :src="sale.image" alt="Товар" class="sale-thumb" />
          <div class="sale-info">
            <div class="sale-header">
              <b>{{ sale.title }}</b>
              <span class="sale-time">{{ sale.date }}</span>
            </div>
            <div class="sale-details">
              <span>Тип: {{ sale.isCredit ? 'В кредит через банк (-5%)' : 'Наличный расчет' }}</span>
              <span class="sale-profit">Прибыль: +{{ formatPrice(sale.profit) }} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from '../store';
const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val || 0);
</script>

<style scoped>
.page-container { max-width: 1100px; margin: 30px auto; padding: 0 20px; }
.header-banner { background: white; padding: 25px 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; }
.header-banner h2 { margin: 0 0 4px 0; color: #1e293b; font-size: 1.4rem; }
.header-banner p { margin: 0; color: #64748b; font-size: 0.95rem; }
.btn-reset { background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 0.9rem; }
.btn-reset:hover { background: #dc2626; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 25px; }
.stat-card { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center; border: 1px solid #f1f5f9; }
.stat-title { font-size: 0.8rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.5px; }
.stat-value { font-size: 1.6rem; font-weight: 800; color: #0f172a; }

.blue { border-bottom: 4px solid #3b82f6; }
.green { border-bottom: 4px solid #10b981; }
.red { border-bottom: 4px solid #ef4444; }
.orange { border-bottom: 4px solid #f59e0b; }

.card { background: white; padding: 28px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
.margin-card h3 { margin: 0 0 18px 0; color: #0f172a; font-size: 1.2rem; }
.margin-bar-container { background: #f1f5f9; border-radius: 20px; height: 32px; overflow: hidden; }
.margin-bar { background: linear-gradient(90deg, #10b981, #34d399); height: 100%; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; min-width: 45px; transition: width 0.4s ease; }
.margin-desc { color: #64748b; margin-top: 14px; font-size: 0.95rem; }

.sales-list { display: flex; flex-direction: column; gap: 14px; margin-top: 18px; }
.sale-item { display: flex; align-items: center; gap: 20px; padding: 14px 18px; border: 1px solid #f1f5f9; border-radius: 12px; background: #fafafa; }
.sale-thumb { width: 85px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; }
.sale-info { flex: 1; }
.sale-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.sale-header b { color: #0f172a; font-size: 1.05rem; }
.sale-time { font-size: 0.85rem; color: #94a3b8; }
.sale-details { display: flex; justify-content: space-between; font-size: 0.95rem; color: #475569; }
.sale-profit { color: #059669; font-weight: 700; }
.empty { text-align: center; color: #94a3b8; padding: 40px; font-size: 1rem; }
</style>