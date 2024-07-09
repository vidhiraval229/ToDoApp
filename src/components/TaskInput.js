import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{STRINGS.taskTitle}</Text>
      <TextInput
        style={styles.input}
        placeholder={STRINGS.placeHolderText}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>{STRINGS.taskDate}</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.label}>{STRINGS.taskTime}</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
          <TouchableOpacity style={{
        height:40, 
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: 'rgba(75, 0, 82, 0.74)',
       }} onPress={handleSubmit}>
        <Text style={{color:"white", fontSize:15, fontWeight:"500"}} >
          {isEditing ?  STRINGS.editTask : STRINGS.addTask}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    backgroundColor: 'rgba(75, 0, 82, 0.51)',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight:"500",
    color:"white"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color:"rgba(75, 0, 82, 0.74)",
    backgroundColor:"white",
    height:40
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 15,
  },
  dateText: {
    color: 'rgba(75, 0, 82, 0.74)',
  },
  errorText:{
    color:"white",
    marginTop:-10,
    paddingBottom:10
  },
  dateTimePicker: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    marginVertical: 10,
    height: 43,
    color:'red'
   },})

export default TaskInput;
