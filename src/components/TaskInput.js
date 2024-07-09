import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import DateTimePicker from '@react-native-community/datetimepicker';
import STRINGS from '../utils/string';

const TaskInput = ({ onSubmit, task, isEditing }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [date, setDate] = useState(task ? new Date(task.date) : new Date());
  const [time, setTime] = useState(task ? new Date(task.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(new Date(task.date));
      setTime(new Date(task.date));
    }
  }, [task]);

  const handleSubmit = () => {
    if (title.trim()) {
      const taskDate = new Date(date);
      taskDate.setHours(time.getHours());
      taskDate.setMinutes(time.getMinutes());
      onSubmit({ id: task ? task.id : null, title, date: taskDate.toISOString() });
      setTitle('');
      setDate(new Date());
      setTime(new Date());
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <InputContainer>
      <Label>{STRINGS.taskTitle}</Label>
      <StyledTextInput
        placeholder={STRINGS.placeHolderText}
        value={title}
        onChangeText={setTitle}
      />
      <Label>{STRINGS.taskDate}</Label>
      <DateButton onPress={() => setShowDatePicker(true)} >
        <DateText>{date.toLocaleDateString()}</DateText>
      </DateButton>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Label>{STRINGS.taskTime}</Label>
      <DateButton onPress={() => setShowTimePicker(true)} >
        <DateText>{time.toLocaleTimeString()}</DateText>
      </DateButton>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
          <SubmitButton onPress={handleSubmit}>
               <SubmitButtonText>
                  {isEditing ?  STRINGS.editTask : STRINGS.addTask}
               </SubmitButtonText>
          </SubmitButton>
      </InputContainer>
  );
};

const InputContainer = styled.View`
  padding: 20px;
  background-color: rgba(75, 0, 82, 0.51);
  border-radius: 10px;
  margin: 10px;
  shadow-color: #000;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 500;
  color: white;
`;

const StyledTextInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  color: rgba(75, 0, 82, 0.74);
  background-color: white;
  height: 40px;
`;

const DateButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const DateText = styled.Text`
  color: rgba(75, 0, 82, 0.74);
`;

const ErrorText = styled.Text`
  color: white;
  margin-top: -10px;
  padding-bottom: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  height: 40px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: rgba(75, 0, 82, 0.74);
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
`;

export default TaskInput;
