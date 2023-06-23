import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "./search-bar/page";

const meta: Meta<typeof SearchBar> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "SearchBar",
	component: SearchBar,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Card: Story = {
	args: { }
};
