import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import TodoList from '../screens/TodoLIst';
import COLORS from '../utils/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName={"ToDoList"} 
       screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.DarkTheme,
        },
        headerTitleAlign:'center',
        headerTintColor: COLORS.White,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="ToDoList" component={TodoList}  options={{headerShown: true, title:"Todo List" }} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
