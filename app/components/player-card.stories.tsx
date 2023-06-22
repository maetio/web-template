import type { Meta, StoryObj } from "@storybook/react";
import { PlayerCard } from "./player-card";

const meta: Meta<typeof PlayerCard> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "PlayerCard",
	component: PlayerCard,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PlayerCard>;

export const Card: Story = {
	args: {
		name: "Jay Boog",
		position: 1,
		medalColor: "gold",
		score: 600,
		change: {
			color: "green",
			magnitude: 50,
		},
	},
};
