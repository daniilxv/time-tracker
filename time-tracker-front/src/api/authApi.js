const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  async login(credentials) {
    await delay();
    // Имитация проверки: любой пользователь с паролем '123' проходит
    if (credentials.password === '123') {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_user_token';
      localStorage.setItem('token', mockToken);
      return { token: mockToken, user: { email: credentials.email } };
    }
    throw new Error('Неверный логин или пароль');
  },

  async register(userData) {
    await delay();
    // Имитация регистрации
    console.log('Регистрация пользователя:', userData);
    return { success: true };
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
