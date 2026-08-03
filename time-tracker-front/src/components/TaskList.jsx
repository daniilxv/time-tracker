import React from 'react';
import { List, ListItem, ListItemText, IconButton, Paper, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, onEdit, onDelete }) => {
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
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText 
                primary={task.title} 
                secondary={task.description} 
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default TaskList;
