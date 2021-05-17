import { render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as TaskStories from "./Task.stories";

describe("Task component", () => {
  const { LongTitle } = composeStories(TaskStories);
  test("should truncate a long title", async () => {
    const { container } = render(<LongTitle loading={false} />);

    const longTitledTask = container.querySelector(
      ".list-item:nth-child(1) .title input"
    );
    console.log(longTitledTask);
    console.log(longTitledTask.innerText);
    console.log(longTitledTask.value);
    expect(longTitledTask).toBeInTheDocument();

    const text = longTitledTask.value;
    expect(text).toContain("absurdly large");
    expect(text).not.toContain("...");
  });
});
