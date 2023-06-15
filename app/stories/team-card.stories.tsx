import type { Meta, StoryObj } from "@storybook/react";
import TeamCard from "./team-card";

const meta: Meta<typeof TeamCard> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "TeamCard",
	component: TeamCard,
	argTypes: {
		
	}
};

export default meta;
type Story = StoryObj<typeof TeamCard>;

export const Card: Story = {
	args: {
	}
};
