import type { Meta, StoryObj } from "@storybook/react";
import { TeamSearchBar } from "./tsb/page";

const meta: Meta<typeof TeamSearchBar> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "TeamSearchBar",
	component: TeamSearchBar,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TeamSearchBar>;

export const Card: Story = {
	args: {},
};
