// Имитация базы данных на стороне сервера
let mockTasks = [
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
];

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const taskApi = {
  // Получить все задачи
  async getTasks() {
    await delay();
    return [...mockTasks];
  },

  // Создать новую задачу
  async createTask(taskData) {
    await delay();
    const newTask = {
      ...taskData,
      id: Date.now(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  // Обновить существующую задачу
  async updateTask(id, taskData) {
    await delay();
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    mockTasks[index] = { ...mockTasks[index], ...taskData };
    return mockTasks[index];
  },

  // Удалить задачу
  async deleteTask(id) {
    await delay();
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    const deletedTask = mockTasks[index];
    mockTasks = mockTasks.filter(t => t.id !== id);
    return deletedTask;
  }
};
