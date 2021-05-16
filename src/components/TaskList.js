import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

import { connect } from "react-redux";
import { archiveTask, pinTask } from "../lib/redux";

export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  return TaskList({ loading, tasks, onPinTask, onArchiveTask });
  // const events = {
  //   onPinTask,
  //   onArchiveTask,
  // };

  // const LoadingRow = (i) => (
  //   <div className="loading-item" key={i}>
  //     <span className="glow-checkbox"></span>
  //     <span className="glow-text">
  //       <span>Loading</span> <span>cool</span> <span>State</span>
  //     </span>
  //   </div>
  // );

  // if (loading) {
  //   return (
  //     <div className="list-items">
  //       {[...Array(6).keys()].map((i) => LoadingRow(i))}
  //     </div>
  //   );
  // }

  // if (tasks.length === 0) {
  //   return (
  //     <div className="list-items">
  //       <div className="wrapper-message">
  //         <span className="icon-check">
  //           <div className="title-message">You have no tasks</div>
  //           <div className="subtitle-message">Sit back and relax</div>
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }

  // const tasksInOrder = [
  //   ...tasks.filter((t) => t.state === "TASK_PINNED"),
  //   ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  // ];
  // return (
  //   <div className="list-items">
  //     {tasksInOrder.map((task) => (
  //       <Task key={task.id} task={task} {...events} />
  //     ))}
  //   </div>
  // );
}

function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (i) => (
    <div className="loading-item" key={i}>
      <span className="glow-checkbox"></span>
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>State</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {[...Array(6).keys()].map((i) => LoadingRow(i))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check">
            <div className="title-message">You have no tasks</div>
            <div className="subtitle-message">Sit back and relax</div>
          </span>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

TaskList.propTypes = {
  /** Loading */
  loading: PropTypes.bool,
  /** Tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event */
  onPinTask: PropTypes.func,
  /** Even */
  onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
  loading: false,
};

PureTaskList.propTypes = TaskList.propTypes;
PureTaskList.defaultProps = TaskList.defaultProps;

// export default TaskList;

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    ),
  }),
  (dispatch) => ({
    onArchiveTask: (id) => dispatch(archiveTask(id)),
    onPinTask: (id) => dispatch(pinTask(id)),
  })
)(PureTaskList);
