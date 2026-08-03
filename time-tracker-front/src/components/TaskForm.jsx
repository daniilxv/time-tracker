import React, { useState, useEffect } from 'react';
import { TextField, Stack } from '@mui/material';

const TaskForm = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStartTime(initialData.startTime || '');
      setEndTime(initialData.endTime || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, startTime, endTime });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack pt={2} spacing={3}>
        <TextField
          label="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            label="Время начала"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Время окончания"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
