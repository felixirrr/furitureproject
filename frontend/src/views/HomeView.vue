<template>
  <div class="home-container">
    <!-- Главный баннер -->
    <section class="hero-section">
      <div class="hero-content">
        <span class="badge">Система Управления Продажами</span>
        <h1>Салон Мебели</h1>
        <p>Автоматизированный учет выручки, себестоимости, кредитных сделок и финансовой маржинальности в реальном времени.</p>
        <div class="hero-buttons">
          <button class="btn-primary" @click="$router.push('/catalog')">
            Открыть Каталог и Продажи
          </button>
          <button class="btn-secondary" @click="$router.push('/analytics')">
            Посмотреть Прибыль
          </button>
        </div>
      </div>
    </section>

    <!-- Карточки преимуществ с реальными мини-фотографиями -->
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <img 
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&q=80" 
            alt="Прибыль" 
            class="feature-img"
          />
          <h3>Расчет Чистой Прибыли</h3>
          <p>Автоматический вычет себестоимости из каждого чека и учет банковской комиссии при продаже в кредит.</p>
        </div>
        <div class="feature-card">
          <img 
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80" 
            alt="Кредитование" 
            class="feature-img"
          />
          <h3>Интеграция с Банком</h3>
          <p>Поддержка кредитных сделок с прозрачной комиссией эквайринга 5% для точной финансовой аналитики.</p>
        </div>
        <div class="feature-card">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80" 
            alt="Скорость" 
            class="feature-img"
          />
          <h3>Redis Кэширование</h3>
          <p>Мгновенная отдача отчетов по финансовым показателям без нагрузки на главную базу данных.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), 
              url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.hero-content {
  max-width: 820px;
  margin: 0 auto;
}

.badge {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

h1 {
  font-size: 2.8rem;
  margin: 0 0 20px 0;
  line-height: 1.25;
  font-weight: 800;
}

p {
  font-size: 1.15rem;
  color: #cbd5e1;
  margin-bottom: 35px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

button {
  padding: 14px 28px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

.btn-primary {
  background: #10b981;
  color: white;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.features-section {
  max-width: 1200px;
  margin: -40px auto 60px auto;
  padding: 0 20px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
}

.feature-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  text-align: center;
  border: 1px solid #f1f5f9;
}

.feature-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 18px;
}

.feature-card h3 {
  margin: 0 0 10px 0;
  color: #1e293b;
  font-size: 1.2rem;
}

.feature-card p {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
}
</style>