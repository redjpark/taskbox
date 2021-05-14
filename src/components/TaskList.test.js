import { render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as TaskListStories from "./TaskList.stories";

const { WithPinnedTasks } = composeStories(TaskListStories);

test("should render pinned tasks before others", () => {
  const { container } = render(<WithPinnedTasks loading={false} />);
  // const pinnedTask = container.querySelector(
  //   '.list-item:nth-child(1) input[value="Task 6 (pinned)"]'
  // );
  const pinnedTask = container.querySelector(".list-item:nth-child(1)");
  console.log(`pinnedInput: ${pinnedTask}`);
  expect(
    container.querySelector(
      '.list-item:nth-child(1) input[value="Task 6 (pinned)"]'
    )
  ).toBeInTheDocument();
});
