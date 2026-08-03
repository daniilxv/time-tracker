import { useState } from 'react'
import { Container, Button, Typography, Box } from '@mui/material'
import TaskList from './components/TaskList'
import TaskModal from './components/TaskModal'
import ConfirmDialog from './components/ConfirmDialog'
import './App.css'

function App() {
  // Моковые данные
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Изучить Material UI', 
      description: 'Посмотреть документацию по компонентам Dialog и List',
      startTime: '2023-10-27T10:00',
      endTime: '2023-10-27T12:00'
    },
    { 
      id: 2, 
      title: 'Настроить API', 
      description: 'Создать эндпоинты для получения и сохранения задач',
      startTime: '2023-10-27T13:00',
      endTime: '2023-10-27T15:30'
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (formData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...formData } : t));
    } else {
      const newTask = {
        id: Date.now(),
        ...formData
      };
      setTasks([...tasks, newTask]);
    }
    handleCloseModal();
  };

  const requestDeleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTaskToDelete(task);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(t => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  const handleCloseConfirm = () => {
    setTaskToDelete(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Time Tracker
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenModal()}
          sx={{ mb: 4 }}
        >
          Добавить задачу
        </Button>

        <TaskList 
          tasks={tasks} 
          onEdit={handleOpenModal} 
          onDelete={requestDeleteTask} 
        />
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

export default App
