import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import TaskForm from './TaskForm';

const TaskModal = ({ open, onClose, onSave, task }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
      sx={{
    color: 'currentColor',
  }}>{task ? 'Редактировать задачу' : 'Добавить задачу'}</DialogTitle>
      <DialogContent>
        <TaskForm 
          initialData={task} 
          onSubmit={(formData) => onSave(formData)} 
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px:2 }} >
        <Button onClick={onClose}>Отмена</Button>

        {/* Кнопка сохранения фактически находится внутри TaskForm через submit, 
            но для Material UI стиля добавим кнопку, которая триггерит сабмит */}
        <Button onClick={() => {
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
