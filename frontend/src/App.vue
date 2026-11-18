<template>
  <div id="app-layout">
    <!-- Верхнее навигационное меню -->
    <header class="navbar">
      <div class="nav-container">
        <div class="brand" @click="$router.push('/')">
          <img 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=80&q=80" 
            alt="Логотип" 
            class="brand-logo-img"
          />
          <span class="logo-text"><b>FURNITURE</b></span>
        </div>
        <nav class="nav-links">
          <router-link to="/">Главная</router-link>
          <router-link to="/catalog">Каталог и Продажи</router-link>
          <router-link to="/analytics">Аналитика Прибыли</router-link>
          <router-link to="/calculator">Калькулятор Наценок</router-link>
          <router-link to="/login" class="login-btn">Вход / Регистрация</router-link>
        </nav>
      </div>
    </header>

    <!-- Основной контент страниц -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Подвал сайта -->
    <footer class="footer">
      <p>© 2026 Автоматизированная система расчета прибыли мебельного салона. Все права защищены.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary: #1e293b;
  --accent: #10b981;
  --accent-hover: #059669;
  --orange: #f59e0b;
  --bg-color: #f8fafc;
  --card-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

body {
  margin: 0;
  font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-color);
  color: #1e293b;
}

#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: var(--primary);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.brand-logo-img {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--accent);
}

.logo-text {
  color: #fff;
  font-size: 1.15rem;
  letter-spacing: 1px;
}

.logo-text b {
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.95rem;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.nav-links a.login-btn {
  background: var(--accent);
  color: #fff;
  padding: 8px 18px;
  border-radius: 20px;
}

.nav-links a.login-btn:hover {
  background: var(--accent-hover);
}

.main-content {
  flex: 1;
}

.footer {
  background: #0f172a;
  color: #64748b;
  text-align: center;
  padding: 24px;
  font-size: 0.9rem;
  margin-top: 40px;
}
</style>