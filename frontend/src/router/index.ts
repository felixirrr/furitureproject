import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CatalogView from '../views/CatalogView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import CalculatorView from '../views/CalculatorView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/catalog', component: CatalogView },
    { path: '/analytics', component: AnalyticsView },
    { path: '/calculator', component: CalculatorView },
    { path: '/login', component: LoginView },
  ],
});

export default router;