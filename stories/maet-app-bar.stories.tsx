import type { Meta, StoryObj } from "@storybook/react";
import { MaetAppBar } from "./maet-app-bar";

const meta: Meta<typeof MaetAppBar> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "MaetAppBar",
	component: MaetAppBar
};

export default meta;
type Story = StoryObj<typeof MaetAppBar>;

export const Primary: Story = {
	render: () => <MaetAppBar />
};
