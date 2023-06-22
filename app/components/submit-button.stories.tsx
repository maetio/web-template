import type { Meta, StoryObj } from "@storybook/react";
import SubmitButton from "./submit-button";

const meta: Meta<typeof SubmitButton> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "SubmitButton",
	component: SubmitButton,
	argTypes: {}
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Card: Story = {
	args: {
		title: "Submit"
	}
};
