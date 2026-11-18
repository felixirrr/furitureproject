<template>
  <div class="card" style="max-width: 450px; margin: 40px auto;">
    <h2>Вход в систему</h2>
    <p style="color: #666; font-size: 0.9rem;">
      Быстрый вход для проверки ролей:<br />
      <b>Администратор:</b> admin@furniture.ru / admin123<br />
      <b>Банковский работник:</b> bank@furniture.ru / admin123<br />
      <b>Клиент:</b> client@furniture.ru / admin123
    </p>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input v-model="email" type="email" required />
      <label>Пароль:</label>
      <input v-model="password" type="password" required />
      <button type="submit">Войти</button>
    </form>
    <div v-if="user" style="margin-top: 15px; color: green;">
      Вы вошли как: <b>{{ user.fullName }}</b> (Роль: {{ user.role }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const email = ref('admin@furniture.ru');
const password = ref('admin123');
const user = ref<any>(null);

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value,
    });
    user.value = res.data.user;
    localStorage.setItem('token', res.data.accessToken);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    alert('Успешный вход!');
  } catch (err: any) {
    alert(err.response?.data?.message || 'Ошибка входа');
  }
};
</script>