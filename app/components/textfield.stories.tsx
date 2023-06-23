import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "app/components/input-field/page";

const meta: Meta<typeof InputField> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "InputField",
	component: InputField,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Primary: Story = {
	args: {},
};
