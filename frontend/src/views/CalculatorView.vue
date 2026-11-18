<template>
  <div class="page-container">
    <div class="card">
      <div class="calc-header">
        <img 
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80" 
          alt="Калькулятор" 
          class="calc-header-img"
        />
        <div>
          <h2>Симулятор и Калькулятор Прибыли Мебели</h2>
          <p>Рассчитайте маржинальность и чистую прибыль до внесения позиции в каталог.</p>
        </div>
      </div>

      <div class="calc-grid">
        <div class="inputs-col">
          <div class="form-group">
            <label>Себестоимость изготовления (₽):</label>
            <input v-model.number="cost" type="number" step="500" />
          </div>

          <div class="form-group">
            <label>Желаемая розничная цена (₽):</label>
            <input v-model.number="price" type="number" step="500" />
          </div>

          <div class="form-group">
            <label>Планируемый объем продаж (шт.):</label>
            <input v-model.number="qty" type="number" min="1" />
          </div>

          <div class="form-group">
            <label>Тип оплаты:</label>
            <select v-model="isCredit">
              <option :value="false">Прямая оплата за наличные (Комиссия 0%)</option>
              <option :value="true">Продажа в кредит через банк (Комиссия 5%)</option>
            </select>
          </div>
        </div>

        <div class="results-col">
          <div class="result-box">
            <div class="res-item">
              <span>Общая Выручка:</span>
              <b>{{ formatPrice(totalRevenue) }} ₽</b>
            </div>
            <div class="res-item">
              <span>Общая Себестоимость:</span>
              <b style="color: #ef4444;">{{ formatPrice(totalCost) }} ₽</b>
            </div>
            <div class="res-item" v-if="isCredit">
              <span>Комиссия Банка (5%):</span>
              <b style="color: #f59e0b;">{{ formatPrice(bankFee) }} ₽</b>
            </div>
            <hr />
            <div class="res-item main-profit">
              <span>Чистая Прибыль:</span>
              <b style="color: #10b981;">{{ formatPrice(netProfit) }} ₽</b>
            </div>
            <div class="res-item">
              <span>Рентабельность (Маржа):</span>
              <b>{{ marginPercent }}%</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const cost = ref(15000);
const price = ref(35000);
const qty = ref(5);
const isCredit = ref(false);

const totalRevenue = computed(() => price.value * qty.value);
const totalCost = computed(() => cost.value * qty.value);
const bankFee = computed(() => isCredit.value ? totalRevenue.value * 0.05 : 0);
const netProfit = computed(() => totalRevenue.value - totalCost.value - bankFee.value);
const marginPercent = computed(() => {
  if (totalRevenue.value === 0) return 0;
  return ((netProfit.value / totalRevenue.value) * 100).toFixed(1);
});

const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val);
</script>

<style scoped>
.page-container { max-width: 1000px; margin: 30px auto; padding: 0 20px; }
.card { background: white; padding: 32px; border-radius: 16px; box-shadow: var(--card-shadow); border: 1px solid #f1f5f9; }
.calc-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
.calc-header-img { width: 70px; height: 70px; border-radius: 12px; object-fit: cover; }
.calc-header h2 { margin: 0 0 4px 0; color: #0f172a; font-size: 1.4rem; }
.calc-header p { margin: 0; color: #64748b; font-size: 0.95rem; }

.calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.form-group { margin-bottom: 16px; }
label { display: block; font-weight: 600; margin-bottom: 6px; color: #1e293b; font-size: 0.95rem; }
input, select { width: 100%; padding: 11px; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box; font-size: 1rem; color: #0f172a; }

.result-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
.res-item { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 1rem; color: #334155; }
.res-item.main-profit { font-size: 1.35rem; font-weight: 800; }
hr { border: none; border-top: 1px solid #e2e8f0; margin: 18px 0; }
</style>