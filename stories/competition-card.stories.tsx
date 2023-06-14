import type { Meta, StoryObj } from "@storybook/react";
import { CompetitionCard, CompetitionCardProps } from "./competition-card";

interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be?
	 */
	size?: "small" | "medium" | "large";
	/**
	 * Button contents
	 */
	label: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

const meta: Meta<typeof CompetitionCard> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "CompetitionCard",
	component: CompetitionCard,
	argTypes: {
		
	}
};

export default meta;
type Story = StoryObj<typeof CompetitionCard>;

export const Card: Story = {
	args: {
	}
};
