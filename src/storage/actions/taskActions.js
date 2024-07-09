export const addTask = task => ({
    type: 'ADD_TASK',
    payload: task,
  });
  
  export const editTask = task => ({
    type: 'EDIT_TASK',
    payload: task,
  });
  
  export const deleteTask = id => ({
    type: 'DELETE_TASK',
    payload: { id },
  });
  
  export const markTaskDone = id => ({
    type: 'MARK_TASK_DONE',
    payload: { id },
  });
  