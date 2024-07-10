import React, { useState, useEffect } from 'react';
import {  FlatList, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components/native';

import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';
import DeleteModal from '../components/DeleteModal';

import { addTask, editTask, deleteTask, markTaskDone } from '../storage/actions/taskActions';

import STRINGS from '../utils/string';
import { showToastAlertWMsg } from '../utils/methodUtils';
import COLORS from '../utils/colors';

const TodoList = () => {

  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      checkAndRemoveExpiredTasks();
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = task => {
    dispatch(addTask({ ...task, id: Date.now().toString() }));
    showToastAlertWMsg(STRINGS.addSuccess);
    Keyboard.dismiss()
  };

  const handleEditTask = task => {
    dispatch(editTask({...task, id:id}));
    showToastAlertWMsg(STRINGS.updateSuccess)
    setIsEditing(false);
    setCurrentTask(null);
    Keyboard.dismiss()
  };

  const handleDeleteTask = () => {
     dispatch(deleteTask(id));
     showToastAlertWMsg(STRINGS.deteleSuccess)
     setDeleteModal(false)
   };

  const handleMarkTaskDone = id => {
     dispatch(markTaskDone(id));
     showToastAlertWMsg(STRINGS.toastMsg);

    setTimeout(() => {
      dispatch(deleteTask(id));
    }, 3000);
  };

  const checkAndRemoveExpiredTasks = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (new Date(task.date) < now) {
        dispatch(deleteTask(task.id));
      }
    });
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
              setId(item?.id)
              setCurrentTask(item);
              setIsEditing(true);
            }}
            onDelete={() => {
              setDeleteModal(true);
              setId(item?.id)
            }}
            onMarkDone={handleMarkTaskDone}
          />
        )}
        keyExtractor={item => item.id}
      />
      
      <DeleteModal
        isShowModel={deleteModal}
        alertTitle={STRINGS.alertMsg}
        alertMsg={STRINGS.alertMsg}
        onPressCancel={() => setDeleteModal(!deleteModal)}
        onPressSuccess={() => handleDeleteTask()}
        onTouchOutside={() => setDeleteModal(false)}
      />
    </Container>
  );
};


const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: ${COLORS.LightTheme};
`;

export default TodoList;
