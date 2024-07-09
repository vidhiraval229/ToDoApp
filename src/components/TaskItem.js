import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import IMAGES from '../utils/image';

const TaskItem = ({ task, onEdit, onDelete, onMarkDone }) => {
  return (
    <ItemContainer>
      <TaskInfo>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDate>{new Date(task?.date)?.toLocaleString()}</TaskDate>
      </TaskInfo>
      <TaskActions>
        <ActionButton onPress={() => onEdit(task)}>
          <ActionImage source={IMAGES.edit} />
        </ActionButton>
        <ActionButton onPress={() => onDelete(task.id)}>
          <ActionImage source={IMAGES.delete} />
        </ActionButton>
        <ActionButton onPress={() => onMarkDone(task.id)}>
          <ActionImage source={IMAGES.emptyCheckMark} />
        </ActionButton>
      </TaskActions>
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  elevation: 2;
`;

const TaskInfo = styled.View`
  flex: 3;
`;

const TaskActions = styled.View`
  flex: 2;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TaskTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: rgba(75, 0, 82, 0.74);
`;

const TaskDate = styled.Text`
  color: rgba(75, 0, 82, 0.74);
`;

const ActionButton = styled.TouchableOpacity``;

const ActionImage = styled.Image`
  height: 20px;
  width: 20px;
  tint-color: rgba(75, 0, 82, 0.74);
`;

export default TaskItem;
