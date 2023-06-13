import type { Meta, StoryObj } from "@storybook/react";
import { CompetitionCard } from "./competition-card";

const meta: Meta<typeof CompetitionCard> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "CompetitionCard",
	component: CompetitionCard
};

export default meta;
type Story = StoryObj<typeof CompetitionCard>;

export const Primary: Story = {
	render: () => <CompetitionCard />
};
