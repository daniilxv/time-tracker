import { useState, useEffect } from 'react'
import { Container, Button, Typography, Box } from '@mui/material'
import TaskList from '../components/TaskList'
import TaskModal from '../components/TaskModal'
import ConfirmDialog from '../components/ConfirmDialog'
import { taskApi } from '../api/taskApi'
import { authApi } from '../api/authApi'
import { useNavigate } from 'react-router-dom'

function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (formData) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, formData);
      } else {
        await taskApi.createTask(formData);
      }
      await loadTasks();
      handleCloseModal();
    } catch (error) {
      console.error('Ошибка при сохранении задачи:', error);
    }
  };

  const requestDeleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTaskToDelete(task);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete) {
      try {
        await taskApi.deleteTask(taskToDelete.id);
        await loadTasks();
        setTaskToDelete(null);
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
      }
    }
  };

  const handleCloseConfirm = () => {
    setTaskToDelete(null);
  };

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1">
            Time Tracker
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenModal()}
          sx={{ mb: 4 }}
        >
          Добавить задачу
        </Button>

        {isLoading ? (
          <Typography variant="body1">Загрузка задач...</Typography>
        ) : (
          <TaskList 
            tasks={tasks} 
            onEdit={handleOpenModal} 
            onDelete={requestDeleteTask} 
          />
        )}
      </Box>

      <TaskModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveTask} 
        task={editingTask} 
      />

      <ConfirmDialog 
        open={Boolean(taskToDelete)} 
        onClose={handleCloseConfirm} 
        onConfirm={confirmDeleteTask} 
        title="Подтверждение удаления" 
        message={`Вы уверены, что хотите удалить задачу "${taskToDelete?.title}"? Это действие нельзя будет отменить.`} 
      />
    </Container>
  )
}

export default MainPage
