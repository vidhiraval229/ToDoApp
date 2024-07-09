import React, { useState } from 'react';
import {  FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';

import { addTask, editTask, deleteTask, markTaskDone } from '../storage/actions/taskActions';

const TodoList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAddTask = task => {
    dispatch(addTask({ ...task, id: Date.now().toString() }));
  };

  const handleEditTask = task => {
    dispatch(editTask(task));
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleDeleteTask = id => {
    dispatch(deleteTask(id));
  };

  const handleMarkTaskDone = id => {
    dispatch(markTaskDone(id));
  };

  return (
    <Container>
      <TaskInput onSubmit={isEditing ? handleEditTask : handleAddTask} task={currentTask} isEditing={isEditing} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => {
              setCurrentTask(item);
              setIsEditing(true);
            }}
            onDelete={handleDeleteTask}
            onMarkDone={handleMarkTaskDone}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};



const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: rgba(75, 0, 82, 0.25);
`;

export default TodoList;
