import type { Meta, StoryObj } from "@storybook/react";
import { CompetitionCard, CompetitionCardProps } from "./competition-card/page";

const meta: Meta<typeof CompetitionCard> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "CompetitionCard",
	component: CompetitionCard,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CompetitionCard>;

export const Card: Story = {
	args: { }
};

