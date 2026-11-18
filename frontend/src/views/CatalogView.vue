<template>
  <div class="page-container">
    <div class="header-banner">
      <div class="banner-text">
        <h2>Каталог Мебели и Продажи</h2>
        <p>Фотографии реальных моделей салона. Каждая продажа автоматически увеличивает чистую прибыль.</p>
      </div>
      <div class="banner-stats">
        Продано сегодня: <b>{{ store.sales.length }} ед.</b>
      </div>
    </div>

    <div class="catalog-grid">
      <div v-for="product in store.products" :key="product.id" class="product-card">
        <!-- Блок отображения фотографии -->
        <div class="product-image-wrapper">
          <img 
            :src="getProductImage(product)" 
            :alt="product.title" 
            class="product-img"
            loading="lazy"
            @error="handleImgError($event, product.id)"
          />
          <div class="product-badge" :class="{ 'out-stock': product.stock === 0 }">
            {{ product.stock > 0 ? `${product.stock} в наличии` : 'Нет на складе' }}
          </div>
        </div>

        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <div class="price-row">
            <span class="label">Себестоимость:</span>
            <span class="cost">{{ formatPrice(product.costPrice) }} ₽</span>
          </div>
          <div class="price-row main-price">
            <span class="label">Цена продажи:</span>
            <span class="sale">{{ formatPrice(product.salePrice) }} ₽</span>
          </div>
          <div class="profit-indicator">
            Прибыль с единицы: <b>+{{ formatPrice(product.salePrice - product.costPrice) }} ₽</b>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-cash" :disabled="product.stock === 0" @click="onSell(product, false)">
            Продать (Наличные)
          </button>
          <button class="btn-credit" :disabled="product.stock === 0" @click="onSell(product, true)">
            В кредит (Банк -5%)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from '../store';

// Прямые проверенные фотографии мебели высокой четкости
const furnitureImages: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', // Диван Честерфилд
  2: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', // Кресло Сканди
  3: 'https://images.unsplash.com/photo-1505693419148-433060e19611?auto=format&fit=crop&w=800&q=80', // Кровать Кинг-Сайз
  4: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', // Стол Обеденный
  5: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', // Шкаф-Купе
  6: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80', // Диван Угловой
};

// Запасные ссылки на случай сбоя
const backupImages: Record<number, string> = {
  1: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
  2: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=800',
  3: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
  4: 'https://images.pexels.com/photos/2097108/pexels-photo-2097108.jpeg?auto=compress&cs=tinysrgb&w=800',
  5: 'https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?auto=compress&cs=tinysrgb&w=800',
  6: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const getProductImage = (product: any) => {
  return furnitureImages[product.id] || product.image || furnitureImages[1];
};

const handleImgError = (event: Event, id: number) => {
  const target = event.target as HTMLImageElement;
  if (target && backupImages[id]) {
    target.src = backupImages[id];
  }
};

const onSell = (product: any, isCredit: boolean) => {
  // Гарантируем передачу актуальной ссылки на картинку в чек
  product.image = getProductImage(product);
  store.sellProduct(product, isCredit);
};

const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val || 0);
</script>

<style scoped>
.page-container { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
.header-banner { background: white; padding: 25px 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; }
.header-banner h2 { margin: 0 0 4px 0; color: #1e293b; font-size: 1.4rem; }
.header-banner p { margin: 0; color: #64748b; font-size: 0.95rem; }
.banner-stats { background: #ecfdf5; color: #059669; padding: 10px 18px; border-radius: 20px; font-size: 0.95rem; border: 1px solid #a7f3d0; }

.catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
.product-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: transform 0.25s, box-shadow 0.25s; display: flex; flex-direction: column; border: 1px solid #f1f5f9; }
.product-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }

.product-image-wrapper { position: relative; height: 220px; width: 100%; background: #e2e8f0; overflow: hidden; }
.product-img { width: 100%; height: 100%; object-fit: cover; display: block; }

.product-badge { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.92); backdrop-filter: blur(4px); padding: 5px 12px; border-radius: 14px; font-size: 0.8rem; font-weight: 700; color: #059669; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.product-badge.out-stock { color: #dc2626; }

.product-info { padding: 22px; }
.product-info h3 { margin: 0 0 16px 0; font-size: 1.2rem; color: #0f172a; font-weight: 700; }

.price-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: #64748b; }
.main-price { font-size: 1.15rem; font-weight: 700; color: #0f172a; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: 10px; }
.profit-indicator { margin-top: 10px; color: #059669; font-size: 0.9rem; font-weight: 600; }

.card-actions { padding: 0 22px 22px 22px; display: flex; flex-direction: column; gap: 10px; margin-top: auto; }
button { width: 100%; padding: 12px; border: none; border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: 0.2s; }
button:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-cash { background: #10b981; color: white; }
.btn-credit { background: #334155; color: white; }
button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
</style>