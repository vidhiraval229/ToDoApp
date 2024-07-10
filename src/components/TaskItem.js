import React from 'react';

import styled from 'styled-components/native';

import IMAGES from '../utils/image';
import COLORS from '../utils/colors';

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
          {
            task?.isCompeleted ? 
             <CheckMark source={IMAGES.checkMark}/> : 
             <ActionImage source={IMAGES.emptyCheckMark} />
          }   
        </ActionButton>
      </TaskActions>
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: ${COLORS.White};
  border-radius: 10px;
  margin: 10px;
  shadow-color: ${COLORS.Black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  elevation: 5;
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
  color: ${COLORS.DarkTheme};
`;

const TaskDate = styled.Text`
  color: ${COLORS.DarkTheme};
`;

const ActionButton = styled.TouchableOpacity``;

const ActionImage = styled.Image`
  height: 20px;
  width: 20px;
  tint-color: ${COLORS.DarkTheme};
`;
const CheckMark = styled.Image`
 height: 20px;
  width: 20px;
`
export default TaskItem;
