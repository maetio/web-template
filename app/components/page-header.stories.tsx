import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./page-header";

const meta: Meta<typeof PageHeader> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "PageHeader",
	component: PageHeader,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Card: Story = {
	args: {
		title: "Reusable Page Header",
	},
};
