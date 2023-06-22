import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "app/screens/textfield";

const meta: Meta<typeof TextField> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "TextField",
	component: TextField,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
	args: {},
};
