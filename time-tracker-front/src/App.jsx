import { useState } from 'react'
import { Container, Button, Typography, Box } from '@mui/material'
import TaskList from './components/TaskList'
import TaskModal from './components/TaskModal'
import './App.css'

function App() {
  // Моковые данные
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Изучить Material UI', description: 'Посмотреть документацию по компонентам Dialog и List' },
    { id: 2, title: 'Настроить API', description: 'Создать эндпоинты для получения и сохранения задач' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
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
          onDelete={handleDeleteTask} 
        />
      </Box>

      <TaskModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveTask} 
        task={editingTask} 
      />
    </Container>
  )
}

export default App
