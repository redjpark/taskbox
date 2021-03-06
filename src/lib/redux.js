import { createStore } from "redux";

export const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK",
};

export const archiveTask = (id) => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = (id) => ({ type: actions.PIN_TASK, id });

// reducer updates the task state
function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

// reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      /* 
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, state: "TASK_ARCHIVED" } : task
        ),
      }; 
      */
      return taskStateReducer("TASK_ARCHIVED")(state, action);
    case actions.PIN_TASK:
      /* 
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, state: "TASK_PINNED" } : task
        ),
      }; 
      */
      return taskStateReducer("TASK_PINNED")(state, action);
    default:
      return state;
  }
};

// initial state
const initialTasks = [
  { id: "1", title: "something", state: "TASK_INBOX" },
  { id: "2", title: "something more", state: "TASK_INBOX" },
  { id: "3", title: "something else", state: "TASK_INBOX" },
  { id: "4", title: "something again", state: "TASK_INBOX" },
];

// now the store
export default createStore(reducer, { tasks: initialTasks });
