import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import { authApi } from './api/authApi'
import './App.css'

// Компонент для защиты маршрутов
const ProtectedRoute = ({ children }) => {
  if (!authApi.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />
        {/* Редирект с любых неизвестных путей на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
