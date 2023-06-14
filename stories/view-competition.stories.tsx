import type { Meta, StoryObj } from "@storybook/react";
import ViewCompetition from "./view-competition";

const meta: Meta<typeof ViewCompetition> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "ViewCompetition",
	component: ViewCompetition
};

export default meta;
type Story = StoryObj<typeof ViewCompetition>;

export const Primary: Story = {
	render: () => <ViewCompetition />
};
