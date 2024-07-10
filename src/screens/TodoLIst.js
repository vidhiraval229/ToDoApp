import React, { useState, useEffect } from 'react';
import {  FlatList, Keyboard, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components/native';

import TaskItem from '../components/TaskItem';
import DeleteModal from '../components/DeleteModal';
import CreateTaskModal from '../components/CreateTaskModal';

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
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState(null);
  const curHr = new Date().getHours();
  let greeting = "Welcome ";


  useEffect(() => {
    const interval = setInterval(() => {
      checkAndRemoveExpiredTasks();
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = task => {
    dispatch(addTask({ ...task, id: Date.now().toString() }));
    showToastAlertWMsg(STRINGS.addSuccess);
    setCreateModal(false)
    Keyboard.dismiss()
  };

  const handleEditTask = task => {
    dispatch(editTask({...task, id:id}));
    showToastAlertWMsg(STRINGS.updateSuccess)
    setIsEditing(false);
    setCurrentTask(null);
    setCreateModal(false);
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

  if (curHr < 12) {
    greeting = STRINGS?.mgsGoodMorning;
} else if (curHr < 17) {
    greeting = STRINGS?.mgsGoodAfternoon;
} else {
    greeting = STRINGS?.mgsGoodEvening;
}

 return (
  <>
    <Container>
      <ProfileView>
       <UserProfile source={{uri:"https://avatar.iran.liara.run/public/boy"}}/>
      <UserTextView>
          <HelloText>{STRINGS.helloText}</HelloText>
          <GreettingText>{greeting}</GreettingText>
      </UserTextView>
      </ProfileView>
      {
        tasks?.length ?
       <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => {
              setId(item?.id)
              setCurrentTask(item);
              setCreateModal(true);
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
      :
       <EmptyView>
          <EmptyText>{STRINGS.emptyTextMsg}</EmptyText>
       </EmptyView>
      }
      
      <CreateTaskModal  
      showModal={createModal}
      inVisible={() => setCreateModal(!createModal)}
      isEditing={isEditing}
      currentTask={currentTask}
      handleAddTask={() => handleAddTask}
      handleEditTask={() => handleEditTask}
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
    <StickyView onPress={() => setCreateModal(true)}>
        <PlusIcon>+</PlusIcon>
    </StickyView>
    </>
  );
};

const EmptyText = styled.Text`
color:${COLORS.DarkTheme};
font-size:15px;
`
const EmptyView = styled.View`
flex:2;
justify-content:center;
align-items:center;
`

const UserTextView = styled.View`
padding-left:10px;
` 
const UserProfile = styled.Image` 
height:55px;
width:55px;
`
const ProfileView = styled.View`
flex-direction:row;
align-items:center;
padding:10px;
`

const PlusIcon = styled.Text`
font-size:45px;
color:${COLORS.White};
font-weight:bold;
text-align:center;
bottom:4px;
`
const StickyView = styled.TouchableOpacity`
height:60px;
width:60px;
border-radius:30px;
background-color:${COLORS.ThemeColor};
position:absolute;
bottom:40px;
right:40px;
align-items:center;
justify-content:center;

`

const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: ${COLORS.LightTheme};
`;

const HelloText = styled.Text`
    font-size:30px;
    font-weight:bold;
    color:${COLORS.DarkTheme};
`
const GreettingText = styled.Text`
   font-size:15px;
    font-weight:bold;
    color:${COLORS.DarkTheme};
`
export default TodoList;
