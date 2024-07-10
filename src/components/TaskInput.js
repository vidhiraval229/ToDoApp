import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import STRINGS from '../utils/string';
import COLORS from '../utils/colors';

const TaskInput = ({ onSubmit, task, isEditing }) => {

  const [title, setTitle] = useState(task ? task.title : '');
  const [date, setDate] = useState(task ? new Date(task.date) : new Date());
  const [time, setTime] = useState(task ? new Date(task.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [error, setError] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(new Date(task.date));
      setTime(new Date(task.date));
    }
  }, [task]);

  const handleSubmit = () => {
    setError('');
    setTitleError('');

    if (!title.trim()) {
      setTitleError(STRINGS.titleError);
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
    const timeDifference = (selectedDateTime - now) / (1000 * 60); // Time difference in minutes

    if (timeDifference < 10) {
      setError(STRINGS.timeError);
      return;
    }

    onSubmit({ title, date: selectedDateTime.toISOString() });
    setTitle('');
    setDate(new Date());
    setTime(new Date());
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
        placeholderTextColor={COLORS.InputTextColor}
        value={title}
        onChangeText={setTitle}
      />
      {titleError ? <ErrorText>{titleError}</ErrorText> : null}
      
      <Label>{STRINGS.taskDate}</Label>
      <DateButton onPress={() => setShowDatePicker(true)}>
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
      <DateButton onPress={() => setShowTimePicker(true)}>
        <DateText>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</DateText>
      </DateButton>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      
      {error ? <ErrorText>{error}</ErrorText> : null}
      
      <SubmitButton onPress={handleSubmit}>
        <SubmitButtonText>{isEditing ? STRINGS.editTask : STRINGS.addTask}</SubmitButtonText>
      </SubmitButton>
    </InputContainer>
  );
};

const InputContainer = styled.View`
  padding: 20px;
  background-color:${COLORS.ThemeColor};
  border-radius: 10px;
  margin: 10px;
  shadow-color: ${COLORS.Black};
  shadow-opacity: 0.5;
  shadow-radius: 2px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 500;
  color: ${COLORS.White};
`;

const StyledTextInput = styled.TextInput`
  border-width: 1px;
  border-color: ${COLORS.LightGray};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  color: ${COLORS.InputTextColor};
  background-color: ${COLORS.White};
  height: 40px;
`;

const DateButton = styled.TouchableOpacity`
  padding: 10px;
  background-color:${COLORS.OffWhite};
  border-radius: 5px;
  margin-bottom: 15px;
`;

const DateText = styled.Text`
  color:${COLORS.InputTextColor};
`;

const ErrorText = styled.Text`
  color: ${COLORS.White};
  margin-top: -10px;
  padding-bottom: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  height: 40px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.DarkTheme};
`;

const SubmitButtonText = styled.Text`
  color: ${COLORS.White};
  font-size: 15px;
  font-weight: 500;
`;

export default TaskInput;
