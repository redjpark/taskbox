import React from "react";
import PropTypes from "prop-types";

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}) {
  return (
    <div className={`list-item ${state}`}>
      <label for="" className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
        ></span>
      </label>
      <div className="title">
        <input
          type="text"
          value={title}
          readonly={true}
          placeholder="Input title"
          style={{ background: "red" }}
        />
      </div>
      <div className="actions" onClick={(e) => e.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`}></span>
          </a>
        )}
      </div>
    </div>
  );
}

Task.propTypes = {
  /** Composition of the task */
  /** Id */
  /** Title of the task */

  task: PropTypes.shape({
    /** Id */
    id: PropTypes.string.isRequired,

    /** Title of the task */
    title: PropTypes.string.isRequired,

    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to 'archived' */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to 'pinned' */
  onPinTask: PropTypes.func,
};
