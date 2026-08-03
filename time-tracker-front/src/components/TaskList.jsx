import React from 'react';
import { List, ListItem, ListItemText, IconButton, Paper, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Список задач
      </Typography>
      <List>
        {tasks.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            Задач пока нет
          </Typography>
        ) : (
          tasks.map((task) => (
            <ListItem 
              key={task.id} 
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => onEdit(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDelete(task.id)}>
                    <DeleteIcon color="error"/>
                  </IconButton>
                </Box>
              }
            >
              <ListItemText 
                primary={task.title} 
                secondary={
                  <Box component="span" sx={{ display: 'block' }}>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {task.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                      {formatDateTime(task.startTime)} — {formatDateTime(task.endTime)}
                    </Typography>
                  </Box>
                } 
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default TaskList;
