import type { Meta, StoryObj } from "@storybook/react";
import PlayerSearchBar from "./player-search-bar/player-search-bar";

const meta: Meta<typeof PlayerSearchBar> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "PlayerSearchBar",
	component: PlayerSearchBar,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PlayerSearchBar>;

export const Card: Story = {
	args: {}
};
