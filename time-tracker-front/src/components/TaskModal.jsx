import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import TaskForm from './TaskForm';

const TaskModal = ({ open, onClose, onSave, task }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? 'Редактировать задачу' : 'Добавить задачу'}</DialogTitle>
      <DialogContent>
        <TaskForm 
          initialData={task} 
          onSubmit={(formData) => onSave(formData)} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={() => {
          // Форма отправляется через onSubmit внутри TaskForm, 
          // но для удобства MUI DialogActions мы можем вызвать submit вручную или через кнопку в форме.
          // В данной реализации TaskForm вызывает onSubmit при сабмите формы.
        }} disabled>
          Сохранить
        </Button>
        {/* Кнопка сохранения фактически находится внутри TaskForm через submit, 
            но для Material UI стиля добавим кнопку, которая триггерит сабмит */}
        <Button variant="contained" onClick={() => {
          const form = document.querySelector('form');
          if (form) form.requestSubmit();
        }}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
